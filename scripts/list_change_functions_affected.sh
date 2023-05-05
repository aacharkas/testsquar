#!/bin/bash
rm functions
list=$(npx nx print-affected --type=app --select=projects --base=$before --head=$after | tr ',' '\n')
list_path=$(find ./apps/functions -name "pro*")
for f in  $list; do 
  for i in $list_path; do
    sub=$(echo $i | cut -d / -f'4')
    name=$(echo  $i | cut -d / -f'5')
    if [[ $f == "functions-$sub-$name" ]]; then
      echo "$sub/$name" >> functions
    fi
  done
done 