#!/bin/bash
stage=$1
function prepare_lambda() {
  echo "Cleaning up workspace ..."
  rm -rf $stage-lambda-functions
  name_functions=$(echo $FILEPATH | cut -d / -f'2')
  sub_name_functions=$(echo $FILEPATH | cut -d / -f'1')
  echo "Creating lambda $stage-$sub_name_functions-$name_functions..."
  mkdir -p $stage-lambda-functions/$sub_name_functions/$name_functions
  echo "Prepare server lambda ..."
  cp -r ./dist/apps/functions/$sub_name_functions/$name_functions $stage-lambda-functions/$sub_name_functions
  mv $stage-lambda-functions/$sub_name_functions/$name_functions/main.js $stage-lambda-functions/$sub_name_functions/$name_functions/$name_functions.js
  echo "Compressing ..."
  pushd $stage-lambda-functions/$sub_name_functions/$name_functions && zip -rq /tmp/$name_functions.zip . -x "*.json" -x "*.map" && mv /tmp/$name_functions.zip ./$name_functions.zip
  rm -rf ./$name_functions.js
  echo "Stats:"
  ls -lh ./$name_functions.zip
  popd
}

prepare_lambda