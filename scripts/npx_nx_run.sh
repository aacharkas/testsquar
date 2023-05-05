#!/bin/bash
path_functions=$(echo functions-$FILEPATH | sed 's/\//-/g')
echo "npx nx tun $path_functions"
npx nx run $path_functions:build
exit=$?
  if [[ $(($exit)) != 0 ]]; then
    break
  fi
exit $exit