import { CLAIM_ITEM_FIELDS } from '../ClaimItems.contants';
import type {
  TClaimItem,
  TClaimItemErrors,
  TClaimItemForm,
} from '../ClaimItems.types';

export const checkClaimItemFormError = (
  claimItemForm: TClaimItemForm,
  formatError: (text: string, field?: string) => string
): TClaimItemErrors => {
  const errors = {};
  if (!claimItemForm[CLAIM_ITEM_FIELDS.DESCRIPTION])
    errors[CLAIM_ITEM_FIELDS.DESCRIPTION] = formatError(
      'Description',
      'description'
    );
  if (!claimItemForm[CLAIM_ITEM_FIELDS.SOURCE])
    errors[CLAIM_ITEM_FIELDS.SOURCE] = formatError('Source', 'source');
  return errors;
};
export const formatCreateData = (claimItemForm: TClaimItemForm) => {
  return {
    [CLAIM_ITEM_FIELDS.DESCRIPTION]:
      claimItemForm[CLAIM_ITEM_FIELDS.DESCRIPTION],
    [CLAIM_ITEM_FIELDS.SOURCE]: claimItemForm[CLAIM_ITEM_FIELDS.SOURCE],
  };
};
export const formatEditData = (
  originalClaimItem: TClaimItem,
  claimItemForm: TClaimItemForm
) => {
  const editResult = {};
  const compareMainValues = (originalName: string, name: string): void => {
    editResult[originalName] = claimItemForm[name];
  };

  compareMainValues('description', CLAIM_ITEM_FIELDS.DESCRIPTION);
  compareMainValues('source', CLAIM_ITEM_FIELDS.SOURCE);
  return editResult;
};
export const formatGetData = (claimItem: TClaimItem): TClaimItemForm => {
  return {
    [CLAIM_ITEM_FIELDS.ID]: claimItem?.id,
    [CLAIM_ITEM_FIELDS.DESCRIPTION]: claimItem?.description,
    [CLAIM_ITEM_FIELDS.SOURCE]: claimItem?.source,
  };
};
