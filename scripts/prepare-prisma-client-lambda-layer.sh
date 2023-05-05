#!/bin/bash
stage=$1
function prepare_prisma_client_lambda_layer() {

  echo "Cleaning up workspace ..."
  rm -rf $stage-lambda-layers-prisma-client

  echo "Creating layer ..."
  mkdir -p $stage-lambda-layers-prisma-client/nodejs/node_modules/.prisma
  mkdir -p $stage-lambda-layers-prisma-client/nodejs/node_modules/@prisma
  mkdir -p $stage-lambda-layers-prisma-client/nodejs/node_modules/dotenv

  echo "Prepare prisma client lambda layer ..."
  cp -r node_modules/.prisma $stage-lambda-layers-prisma-client/nodejs/node_modules
  cp -r node_modules/@prisma $stage-lambda-layers-prisma-client/nodejs/node_modules
  cp -r node_modules/dotenv $stage-lambda-layers-prisma-client/nodejs/node_modules

  echo "Compressing ..."
  pushd $stage-lambda-layers-prisma-client && zip -r /tmp/nodejs.zip . && mv /tmp/nodejs.zip ./nodejs.zip

  echo "Remove ..."
  rm -rf ./nodejs

  echo "Stats:"
  ls -lh nodejs.zip

  popd
}
  prepare_prisma_client_lambda_layer
