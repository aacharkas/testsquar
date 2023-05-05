import { InsuranceScopeGroupInfo } from '@squaredash/crud/insurance-scope';

// Function used to get depth level of requested group
export const findGroupIndex = (
  groups: InsuranceScopeGroupInfo[],
  groupId: string,
  index = 0
): number => {
  for (const group of groups) {
    if (group.id === groupId) {
      return index;
    }

    const result = findGroupIndex(group.groups, groupId, index + 1);
    if (result > -1) {
      return result;
    }
  }

  return -1;
};
