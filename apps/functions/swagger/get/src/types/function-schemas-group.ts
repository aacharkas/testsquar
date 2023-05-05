import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from './function-schema';

import TagObject = OpenAPIV3.TagObject;

export interface FunctionSchemasGroup {
  tag: TagObject;
  schemas: FunctionSchema[];
}
