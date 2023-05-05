#!/bin/bash
for i in $(find ./apps/functions -name "pro*"); do
  echo $(echo $i | cut -d / -f'4')/$(echo $i | cut -d / -f'5') >> functions
done