import { IItem } from '../../../../../../../libs/web/components/Select/SelectControlled';
import { MEMBER_FIELDS } from '../../../../Members/Member/MemberForm.constants';
import { GROUP_FIELDS, GROUP_ITEM_FIELDS } from '../Items.constants';
import { TGroupErrors, TGroupForm } from '../Items.types';

export const formatCreateGroupData = (groupForm: TGroupForm) => {
  const result = {
    [GROUP_FIELDS.GROUP_NAME]: groupForm[GROUP_FIELDS.GROUP_NAME],
    [GROUP_FIELDS.GROUP_NOTES]: groupForm[GROUP_FIELDS.GROUP_NOTES],
  };
  if (groupForm[GROUP_FIELDS.GROUP_PARENT_ID]) {
    result[GROUP_FIELDS.GROUP_PARENT_ID] =
      groupForm[GROUP_FIELDS.GROUP_PARENT_ID];
  }

  return result;
};

export const formatCreateGroupItemData = (
  groupItemForm: TGroupForm,
  isFieldsNeeded = false
) => {
  const result = {
    [GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION]: (
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_ID] as IItem
    )?.name,
    [GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES]:
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES],
    [GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT]: (
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT] as IItem
    )?.type,
    [GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_TAX]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_TAX]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_RCV]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_RCV]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_ACV]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_ACV]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE]: Number(
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE]
    ),
    [GROUP_ITEM_FIELDS.GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE]: (
      groupItemForm[
        GROUP_ITEM_FIELDS.GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE
      ] as IItem
    )?.type,
    [GROUP_ITEM_FIELDS.GROUP_ITEM_ID]: (
      groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_ID] as IItem
    )?.id,
  };
  if (isFieldsNeeded) {
    result[GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION] = groupItemForm[
      GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION
    ] as IItem;
    result[GROUP_ITEM_FIELDS.GROUP_ITEM_NEW] = {
      [GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION]: groupItemForm[
        GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION
      ] as IItem,
      [GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE]: (
        groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE] as IItem
      )?.type,
    };
  }
  return result;
};

export const checkGroupFormError = (
  groupForm: TGroupForm,
  formatError: (name: string) => string
): TGroupErrors => {
  const errors = {};
  if (!groupForm[GROUP_FIELDS.GROUP_NAME])
    errors[GROUP_FIELDS.GROUP_NAME] = formatError('group_name');
  return errors;
};

export const checkGroupItemFormError = (
  groupItemForm: TGroupForm,
  formatError: (name: string) => string,
  isFieldsNeeded: boolean
): TGroupErrors => {
  const errors = {};
  if (
    isFieldsNeeded &&
    !groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION]
  )
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION] =
      formatError('description');
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY] = formatError('quantity');
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT] =
      formatError('unit');
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE] = formatError('unit_price');
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_TAX])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_TAX] = formatError('tax');
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD] = formatError(
      'overhead_and_profit'
    );
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_RCV])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_RCV] = formatError('rcv');
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_ACV])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_ACV] = formatError('acv');
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM] =
      formatError('depreciation_sum');
  if (!groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE] = formatError(
      'depreciation_percentage'
    );
  if (isFieldsNeeded && !groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE])
    errors[GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE] = formatError('source');
  return errors;
};

export const formatUnitsData = (uoms): IItem[] => {
  return uoms?.map((item) => {
    return {
      id: item.id,
      name: item.abbreviation,
      type: item.abbreviation,
    };
  });
};
