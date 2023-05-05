#!/bin/bash

json_all_functions=$(aws lambda list-functions)
all_name_functions=$(echo $json_all_functions | jq -r '.Functions[].FunctionName')
for name_function in $all_name_functions; do
    arn_function=$(echo $json_all_functions | jq -r --arg name "$name_function" '.Functions[] | select(.FunctionName == $name).FunctionArn')
    echo "create EventBridge rule rule: $name_function"
    aws events put-rule --name $name_function --schedule-expression "rate(5 minutes)"
#    aws events delete-rule --name $name_function
    echo "add target: arn_function to EventBridge rule $name_function"
    aws events put-targets --rule $name_function --targets "Id"="1","Arn"=$arn_function
done