#!/bin/bash
stage=$1
json_lambda_functions=$(aws lambda list-functions --query "Functions[?starts_with(FunctionName, '$stage')]")
json_lambda_layer_prisma=$(aws lambda list-layer-versions --layer-name $stage-prisma )
lambda_layer_prisma=$(echo $json_lambda_layer_prisma | jq -r '.LayerVersions[].LayerVersionArn')
name_functions=$(echo $json_lambda_functions | jq -r '.[].FunctionName')
prisma_layers=$(echo $json_lambda_functions | jq -r '.[].Layers[] | select(.Arn | contains("prisma")).Arn' | sort -u)
for layer_name in $name_functions; do
  all_arn_versions=$(aws lambda list-layer-versions --layer-name $layer_name )
  used_layer=$(echo $json_lambda_functions | jq -r --arg layer "$layer_name:" '.[].Layers[] | select(.Arn | contains($layer)).Arn' )
  echo $used_layer
  get_arn=$(echo $all_arn_versions | jq -r '.LayerVersions[].LayerVersionArn')
  for delete_layer in $get_arn; do
    if [[ $delete_layer != $used_layer ]]; then
      version=$(echo $all_arn_versions | jq -r --arg layer "$delete_layer" '.LayerVersions[] | select(.LayerVersionArn == $layer).Version')
      echo "delete layer_arn $delete_layer: $version"
      echo "$layer_name"
      aws lambda delete-layer-version --layer-name $layer_name --version-number $version 
    else
      echo "no delete layer_arn $delete_layer"
    fi
  done
done
for prisma_layer_name in $lambda_layer_prisma; do
  version_prisma=$(echo $json_lambda_layer_prisma | jq -r --arg layer "$prisma_layer_name" '.LayerVersions[] | select(.LayerVersionArn == $layer).Version')
  if grep -q "$prisma_layer_name" <<< "$prisma_layers"; then
    echo "no delete $version_prisma"
    echo "no delete$prisma_layer_name"
  else
    echo "delete $version_prisma"
    echo "delete $stage-prisma : $prisma_layer_name"
    aws lambda delete-layer-version --layer-name $stage-prisma --version-number $version_prisma
  fi
done


