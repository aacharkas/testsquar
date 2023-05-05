import { InsuranceScopeGroupInfo } from '@squaredash/crud/insurance-scope';
import { Nullable } from '@squaredash/shared/interfaces';

export const getGroupIdsToDelete = (
  groups: InsuranceScopeGroupInfo[],
  groupId: string
): string[] => {
  const group = getGroup(groups, groupId);

  if (!group) {
    return [];
  }

  return getGroupIds(group);
};

const getGroup = (
  groups: InsuranceScopeGroupInfo[],
  groupId: string
): Nullable<InsuranceScopeGroupInfo> => {
  for (const group of groups) {
    if (group.id === groupId) {
      return group;
    }

    const result = getGroup(group.groups, groupId);
    if (result) {
      return result;
    }
  }

  return null;
};

const getGroupIds = (group: InsuranceScopeGroupInfo, ids = []): string[] => {
  ids.push(group.id);
  for (const childGroup of group.groups) {
    getGroupIds(childGroup, ids);
  }

  return ids;
};
