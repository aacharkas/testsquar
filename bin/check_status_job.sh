#!/bin/bash
var1=$(aws batch describe-jobs --jobs $1 | jq -re '.jobs | .[]? | .status')
while  [[  $var1 != FAILED ]] && [[ $var1 != SUCCEEDED ]]
do
if [[ "$var1" = "$(aws batch describe-jobs --jobs $1 | jq -re '.jobs | .[]? | .status')" ]]; then
	sleep 10
else
	var1=$(aws batch describe-jobs --jobs $1 | jq -re '.jobs | .[]? | .status')
	echo $var1
fi
done
echo "Status reason: "$(aws batch describe-jobs --jobs $1 | jq -re '.jobs | .[]? | .statusReason ')