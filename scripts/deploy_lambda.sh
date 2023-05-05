#!/bin/bash
stage=$1
list_lambda_functions=$(aws lambda list-functions --query Functions[].FunctionName --output text)
name_functions=$(echo $FILEPATH | cut -d / -f'2')
sub_name_functions=$(echo $FILEPATH | cut -d / -f'1')
decrypted_PRISMA=$(gpg --decrypt --quiet --batch --passphrase "$AWS_SECRET_ACCESS_KEY" --output - <(echo "$PRISMA" | base64 --decode))
#decrypted_NODEMODULE=$(gpg --decrypt --quiet --batch --passphrase "$AWS_SECRET_ACCESS_KEY" --output - <(echo "${{ needs.preparing_functions_and_deploy_layers.outputs.node_module_arn }}" | base64 --decode))
node_modules_layer=$(aws lambda list-layers --query $(echo Layers[?LayerName==\`$stage-$sub_name_functions-$name_functions\`].LatestMatchingVersion.LayerVersionArn) --output text)
name=$stage-$sub_name_functions-$name_functions
environment="Variables={DATABASE_URL=$DATABASE_URL, APP_URL=$APP_URL, NODE_ENV=$NODE_ENV, SENDGRID_API_KEY=$SENDGRID_API_KEY, TESTING_RECIPIENT_EMAIL=$TESTING_RECIPIENT_EMAIL, PUBLIC_BUCKET=$PUBLIC_BUCKET, ADOBE_ACCOUNT_ID=$ADOBE_ACCOUNT_ID, ADOBE_CLIENT_ID=$ADOBE_CLIENT_ID, ADOBE_CLIENT_SECRET=$ADOBE_CLIENT_SECRET, ADOBE_ORG_ID=$ADOBE_ORG_ID, ADOBE_PRIVATE_KEY=$ADOBE_PRIVATE_KEY, PUSHER_APP_ID=$PUSHER_APP_ID, PUSHER_CLUSTER=$PUSHER_CLUSTER, PUSHER_KEY=$PUSHER_KEY, PUSHER_SECRET=$PUSHER_SECRET, API_GW_DOMAIN_NAME=$API_GW_DOMAIN_NAME, EMAIL_NOTIFICATION_TOPIC=$EMAIL_NOTIFICATION_TOPIC, INSURANCE_SCOPE_SELF_VALIDATION_TOPIC=$INSURANCE_SCOPE_SELF_VALIDATION_TOPIC, REDIS_HOST=$REDIS_HOST, GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY}"
if grep -qE "($name\s|$name\$)" <<< "$list_lambda_functions"; then
  echo "update code lambda function $name"
  aws lambda update-function-code \
    --function-name "$name" \
    --s3-bucket="$BUCKET" \
    --s3-key="$stage-lambda-functions/$sub_name_functions/$name_functions/$name_functions.zip"
  aws lambda wait function-updated --function-name "$name"
  echo "update configuration lambda function $name"
  aws lambda update-function-configuration \
    --function-name "$name" \
    --vpc-config SubnetIds="subnet-02f889e2b94d9d99f","subnet-0a90998808191326a","subnet-050575384d056010f",SecurityGroupIds="sg-0c546c91fa5892a8c" \
    --layers $decrypted_PRISMA $node_modules_layer \
    --environment "$environment" \
    --timeout 180 \
    --memory-size 256

else

  echo "create lambda function $name"
  lambda_arn=$(aws lambda create-function \
    --function-name "$name"\
    --code S3Bucket="$BUCKET",S3Key="$stage-lambda-functions/$sub_name_functions/$name_functions/$name_functions.zip" \
    --description 'apigwy-http-api serverlessland'\
    --runtime nodejs16.x\
    --handler "$sub_name_functions/$name_functions.handler"\
    --role arn:aws:iam::218855300330:role/serverless_lambda\
    --layers $decrypted_PRISMA $node_modules_layer \
    --environment "$environment" \
    --vpc-config SubnetIds="subnet-02f889e2b94d9d99f","subnet-0a90998808191326a","subnet-050575384d056010f",SecurityGroupIds="sg-0c546c91fa5892a8c" \
    --timeout 180 \
    --memory-size 256 --query FunctionArn)
  aws lambda wait function-updated --function-name "$name"
  echo "add permission lambda function $name"
  aws lambda add-permission \
    --function-name "$name" \
    --action lambda:InvokeFunction \
    --statement-id AllowExecutionFromAPIGateway \
    --principal apigateway.amazonaws.com \
    --source-arn arn:aws:execute-api:us-east-1:218855300330:$(aws apigatewayv2 get-apis --query  Items[?Name==\`$stage\`].ApiId --output text)/*/*
  echo "create EventBridge rule rule: $name"
  aws events put-rule --name $name --schedule-expression "rate(5 minutes)"
  echo "add target to EventBridge rule rule $name"
  aws events put-targets --rule $name --targets "Id"="1","Arn"=$lambda_arn
fi