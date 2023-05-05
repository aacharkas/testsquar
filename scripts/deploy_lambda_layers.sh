#!/bin/bash
stage=$1
name_functions=$(echo $FILEPATH | cut -d / -f'2')
sub_name_functions=$(echo $FILEPATH | cut -d / -f'1')
aws lambda publish-layer-version \
    --layer-name "$stage-$sub_name_functions-$name_functions" \
    --description "$stage-$sub_name_functions-$name_functions node_modules" \
    --content S3Bucket=$BUCKET,S3Key=$stage-lambda-layers-node_modules/$sub_name_functions/$name_functions/nodejs.zip \
    --compatible-runtimes nodejs12.x nodejs14.x nodejs16.x  nodejs18.x \
    --query 'LayerVersionArn' --output text

#    aws lambda publish-layer-version \
#        --layer-name "$stage-prisma" \
#        --description "$stage-prisma" \
#        --content S3Bucket=$BUCKET,S3Key=$stage-lambda-layers-prisma-client/nodejs.zip \
#        --compatible-runtimes nodejs12.x nodejs14.x nodejs16.x  nodejs18.x