#!/usr/bin/env bash

SCRIPT_NAME=$( basename $0 )
SCRIPT_DIR=$( cd $(dirname $0) && pwd -P )
ROOT_DIR=$( cd $SCRIPT_DIR && cd .. && pwd -P)

echo "build starting ..."
if [ ! -d "${ROOT_DIR}/node_modules" ]; then
  echo "  [error] dependencies not installed! run 'yarn install'."
  exit 1
fi
${ROOT_DIR}/node_modules/.bin/gulp

echo "create the package ..."
aws cloudformation package \
    --template-file ${ROOT_DIR}/sam.yml \
    --s3-bucket ${S3_BUCKET_NAME} \
    --output-template-file ${ROOT_DIR}/dist/packaged-sam.yml

echo "deploy ..."
aws cloudformation deploy \
    --template-file ${ROOT_DIR}/dist/packaged-sam.yml \
    --stack-name ${STACK_NAME} \
    --region us-east-1 \
    --capabilities CAPABILITY_IAM

API_URL=$(aws cloudformation list-exports --region us-east-1 --query 'Exports[?Name==`todos-api-url`].Value' --output text)
echo ${API_URL}
