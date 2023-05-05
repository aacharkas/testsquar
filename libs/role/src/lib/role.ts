import { RolePermission } from './interfaces/role-permission';
import * as repository from './repository';

export function getRolePermissionsByRole(role: string): RolePermission {
  return repository.getRolePermissionsByRole(role);
}
