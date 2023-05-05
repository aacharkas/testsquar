#!/bin/bash
function npm_install() {
  for i in $(find ./dist/apps/functions -maxdepth 3 -name "package.json"); do
    name_functions=$(echo $i | cut -d / -f'6')
    sub_name_functions=$(echo $i | cut -d / -f'5')
    echo "npm install --prefix .dist/apps/functions/$sub_name_functions/$name_functions"
    npm install --prefix ./dist/apps/functions/$sub_name_functions/$name_functions
    exit=$?
    if [[ $(($exit)) != 0 ]]; then
      break
    fi
  done
  exit $exit
}
if [ -d "./dist/apps" ]; then
  npm_install

fi
