import { OpenAPIV3 } from 'openapi-types';

import ComponentsObject = OpenAPIV3.ComponentsObject;
import HttpMethods = OpenAPIV3.HttpMethods;
import OperationObject = OpenAPIV3.OperationObject;

export interface FunctionSchema {
  path: FunctionPathSchema;
  components: ComponentsObject;
}

export interface FunctionPathSchema {
  route: string;
  method: HttpMethods;
  value: OperationObject;
}
