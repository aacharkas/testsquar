#!/bin/bash
stage=$1
function prepare_node_modules_lambda_layer() {
  echo "Cleaning up workspace ..."
  rm -rf $stage-lambda-layers-node_modules
  name_functions=$(echo $FILEPATH | cut -d / -f'2')
  sub_name_functions=$(echo $FILEPATH | cut -d / -f'1')
  echo "Creating layer $sub_name_functions-$name_functions..."
  mkdir -p $stage-lambda-layers-node_modules/$sub_name_functions/$name_functions/nodejs
  rm -rf ./dist/apps/functions/$sub_name_functions/$name_functions/node_modules/.prisma
  rm -rf ./dist/apps/functions/$sub_name_functions/$name_functions/node_modules/@prisma
  echo "Prepare server node_modules lambda layer ..."
  mv ./dist/apps/functions/$sub_name_functions/$name_functions/node_modules $stage-lambda-layers-node_modules/$sub_name_functions/$name_functions/nodejs/
  echo "Compressing ..."
  pushd $stage-lambda-layers-node_modules/$sub_name_functions/$name_functions && zip -rq /tmp/nodejs.zip . && mv /tmp/nodejs.zip ./nodejs.zip
  echo "Remove ..."
  rm -rf ./nodejs
  echo "Stats:"
  ls -lh ./nodejs.zip
  popd
}
  
prepare_node_modules_lambda_layer