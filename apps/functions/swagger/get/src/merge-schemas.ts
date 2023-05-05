import { OpenAPIV3 } from 'openapi-types';

import { sharedComponents } from './schemas/shared-components';
import { FunctionSchemasGroup } from './types/function-schemas-group';

import PathsObject = OpenAPIV3.PathsObject;

export const mergeSchemas = (
  groups: FunctionSchemasGroup[],
  serverHostname: string
): OpenAPIV3.Document => {
  const mergedGroups = groups.map(mergeSchemasGroup);

  return {
    openapi: '3.0.1',
    info: {
      title: 'SquareDash',
      version: '0.0.0',
    },
    tags: mergedGroups.map((group) => group.tag),
    paths: mergeObjects(mergedGroups.map((group) => group.paths)),
    components: {
      schemas: mergeObjects([
        ...mergedGroups.map((group) => group.components.schemas),
        sharedComponents.schemas,
      ]),
      requestBodies: mergeObjects([
        ...mergedGroups.map((schema) => schema.components.requestBodies),
        sharedComponents.requestBodies,
      ]),
      responses: mergeObjects([
        ...mergedGroups.map((group) => group.components.responses),
        sharedComponents.responses,
      ]),
      securitySchemes: mergeObjects([
        ...mergedGroups.map((group) => group.components.securitySchemes),
        sharedComponents.securitySchemes,
      ]),
    },
    servers: [
      {
        url: `https://${serverHostname}`,
      },
    ],
  };
};

function mergeObjects<T extends object>(objs: T[]): T {
  return objs.reduce(
    (accumulated, current) => ({ ...accumulated, ...current }),
    {} as T
  );
}

function mergeSchemasGroup(group: FunctionSchemasGroup) {
  const paths: PathsObject = {};

  for (const { path } of group.schemas) {
    if (!paths[path.route]) {
      paths[path.route] = {};
    }
    paths[path.route][path.method] = path.value;
  }

  return {
    tag: group.tag,
    paths,
    components: {
      schemas: mergeObjects(
        group.schemas.map((schema) => schema.components.schemas)
      ),
      requestBodies: mergeObjects(
        group.schemas.map((schema) => schema.components.requestBodies)
      ),
      responses: mergeObjects(
        group.schemas.map((schema) => schema.components.responses)
      ),
      securitySchemes: mergeObjects(
        group.schemas.map((schema) => schema.components.securitySchemes)
      ),
    },
  };
}
