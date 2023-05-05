#!/bin/bash
for i in $(find ./apps/functions -name "project*" )
do
path_functions=$(echo $i | cut -d / -f'-5' | cut -d / -f'3 4 5' | sed 's/\//-/g')
echo "npx nx run $path_functions"
npx nx run $path_functions:build
exit=$?
  if [[ $(($exit)) != 0 ]]; then
    break
  fi
done
exit $exit
