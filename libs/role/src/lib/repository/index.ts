import { RolePermission } from '../interfaces/role-permission';
import { ROLE_PERMISSIONS } from './data';

export function getRolePermissionsByRole(role: string): RolePermission {
  return ROLE_PERMISSIONS[role];
}
