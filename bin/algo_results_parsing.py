from typing import Dict, List, Union
from functools import lru_cache
import json
import os
import re
import sys
import time

import boto3
import fire


def levenstein_distance(a: str, b: str):
    """Calculate the levenshtein distance between two input strings a and b.

    Args:
        a: The first string you want to compare
        b: The second string you want to compare

    Returns:
        This function will return the distnace between string a and b.
    """
    if len(a) > 100 or len(b) > 100:
        return ''
    @lru_cache(None)
    def min_dist(s1, s2):
        if s1 == len(a) or s2 == len(b):
            return len(a) - s1 + len(b) - s2

        if a[s1] == b[s2]:
            return min_dist(s1 + 1, s2 + 1)

        return 1 + min(
            min_dist(s1, s2 + 1),
            min_dist(s1 + 1, s2),
            min_dist(s1 + 1, s2 + 1),
        )

    return min_dist(0, 0)


def intersection(lst1: List, lst2: List):
    """Selects the similar elements in two lists.

    Args:
        lst1: List 1 to compare.
        lst2: List 2 to compare.

    Returns:
        List with similar elements in two lists.
    """
    lst3 = [value for value in lst1 if value in lst2]
    return lst3


def difference(lst1: List, lst2: List):
    """Selects the different elements in two lists.

    Args:
        lst1: List 1 to compare.
        lst2: List 2 to compare.

    Returns:
        Lists with different elements from two lists.
    """
    lst3 = [value for value in lst1 if value not in lst2]
    lst4 = [value for value in lst2 if value not in lst1]
    return lst3, lst4


def item_generator(json_input: Union[str, list, Dict]):
    """Walks through the json and extracts all the fields.

    Args:
        json_input: Input data.

    Yields:
        Dictionaries {key : value}.
    """
    if isinstance(json_input, str):
        yield json_input
    elif isinstance(json_input, list):
        for item in json_input:
            yield from item_generator(item)
    else:
        for key, value in json_input.items():
            if (
                isinstance(value, str)
                or isinstance(value, int)
                or isinstance(value, float)
            ):
                yield {key: str(value)}
            elif isinstance(value, list):
                for item in value:
                    yield from item_generator(item)
            elif isinstance(value, dict):
                for k, v in value.items():
                    yield {k: str(v)}


def make_report(exp: Dict, act: Dict):
    """Generates report for expected and actual jsons.

    Args:
        exp: Dictionary with expected values.
        act: Dictionary with acual values.

    Returns:
        String with report.
    """
    report = ""
    global_all_fields = 0
    global_failure_fields = 0

    if exp.keys() != act.keys():
        report += "Warning: the actual-json keys do not much the expected-json keys.\n"
    keys = set(exp.keys()).intersection(act.keys())

    for key in keys:
        all_fields = 0
        failure_fields = 0
        report += "##" * 40
        report += f"\nProcessing {key} ...\n"

        exps = list(item_generator(exp[key]))
        acts = list(item_generator(act[key]))

        if len(exps) == len(acts):
            report += "\nAll fields were parsed. Checking the correctness of parsing.\n"
            for exp_item, act_item in zip(exps, acts):
                if isinstance(exp_item, str) and isinstance(act_item, str):
                    distance = levenstein_distance(exp_item, act_item)
                    if distance != 0:
                        failure_fields += 1
                        global_failure_fields += 1
                        report += "\nWarning: the value in expected and in the actual do not match."
                        report += f"\nExpected value: {exp_item}\nActual value: {act_item}"
                        report += f"\nLevenstein distance: {distance}"
                    all_fields += 1
                    global_all_fields += 1
                elif isinstance(exp_item, dict) and isinstance(act_item, dict):
                    distance = levenstein_distance(
                        list(exp_item.values())[0], list(act_item.values())[0]
                    )
                    if distance != 0:
                        failure_fields += 1
                        global_failure_fields += 1
                        report += f"\nWarning: the value in expected {key} and in the actual {key} do not match."
                        report += f"\nExpected value: {list(exp_item.values())[0]}\nActual value: {list(act_item.values())[0]}"
                        report += f"\nLevenstein distance: {distance}"
                    all_fields += 1
                    global_all_fields += 1
            try:
              eterterte = (all_fields - failure_fields) / all_fields
            except ZeroDivisionError:
              eterterte = 0
            report += f"\nAccuracy for {key}: {eterterte * 100:.2f} %\n"
        else:
            report += "\nSome fields were skipped. Checking the intersection and differences."
            report += "\nIntersected fields. Field details:"
            report += f"\n{intersection(exps, acts)}"
            report += "\nDifferent fields. Field details:"
            report += f"\n{difference(exps, acts)[0]}"
            report += f"\nPercentage of skipped fields: {(len(difference(exps, acts)[0]) / len(exps)) * 100:.2f} %\n"
    try:
        total_accuracy = (global_all_fields - global_failure_fields) / global_all_fields * 100
    except ZeroDivisionError:
        total_accuracy = 0
    report += f"\nTotal accuracy: {total_accuracy:.2f} % (except skipped fields)."
    return report, total_accuracy == 100


def get_file_folders(
    s3_client: str, bucket_name: str, prefix: str = "resources"
):
    """Creates the lists with all the files and folders from AWS space.

    Args:
        s3_client: s3 client.
        bucket_name: Bucket name.
        prefix: Prefix.

    Returns:
        Lists of filenames and folders from AWS space.
    """
    file_names = []
    folders = []

    default_kwargs = {"Bucket": bucket_name, "Prefix": prefix}
    next_token = ""

    while next_token is not None:
        updated_kwargs = default_kwargs.copy()
        if next_token != "":
            updated_kwargs["ContinuationToken"] = next_token

        response = s3_client.list_objects_v2(**default_kwargs)
        contents = response.get("Contents")

        for result in contents:
            key = result.get("Key")
            if key[-1] == "/":
                folders.append(key)
            else:
                file_names.append(key)

        next_token = response.get("NextContinuationToken")

    return file_names, folders


def collect_files(file_names: str):
    """Collects the dictionaty for evaluation algorithm.

    Args:
        file_names: List of all the files.

    Returns:
        Dictionary with pathes to json fles.
    """
    pdfs = set(file_name.split("/")[1] for file_name in file_names)
    folder_structure = {}
    for pdf in pdfs:
        pathes = [
            pth
            for pth in file_names
            if pdf in pth and not pth.split("/")[-1].startswith(".")
        ]
        folder_structure[pdf] = {}
        folder_structure[pdf]["expected_result"] = [
            pth for pth in pathes if re.search("expected.results", pth)
        ]
        folder_structure[pdf]["actual_results"] = [
            pth for pth in pathes if re.search("actual.results", pth)
        ]
    return folder_structure


def main(
    path_to_save: str = "results",
    s3_bucket_name: str = os.environ.get("S3_BUCKET", "dev-squaredash-data"),
    s3_client: str = "s3",
    s3_resource: str = "s3",
    prefix: str = "resources",
):
    """Generates report with comparison of expected and actual jsons.

    Args:
        path_to_save: Path to save the reports.
        s3_client: s3 client name.
        s3_bucket_name: s3 bucket name.
        s3_resource: s3 resource name.
    """
    s3_client = boto3.client(s3_client)
    s3_bucket_name = s3_bucket_name
    s3 = boto3.resource(s3_resource)

    bucket_list, _ = get_file_folders(s3_client, s3_bucket_name, prefix)

    pdf_folders = collect_files(bucket_list)

    status = True

    for key in pdf_folders.keys():
        exp = json.loads(
            s3.Object(s3_bucket_name, pdf_folders[key]["expected_result"][0])
            .get()["Body"]
            .read()
        )
        act = json.loads(
            s3.Object(s3_bucket_name, pdf_folders[key]["actual_results"][0])
            .get()["Body"]
            .read()
        )
        report, current_status = make_report(exp, act)
        status = status & current_status
        s3.Object(
            s3_bucket_name, os.path.join(path_to_save, key, "report.txt")
        ).put(Body=report)
        print("🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️")
        print("- cheking: "+pdf_folders[key]["expected_result"][0])
        print("🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️🗯️")
        print(report+"\n\n")
    return status


def lambda_handler(event, context):
    fire.Fire(main)

    return {
        "message": "OK"
    }

if __name__ == "__main__":
    status = fire.Fire(main)
    sys.exit(int(not status))