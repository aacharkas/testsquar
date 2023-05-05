import type { TDocumentErrors, TDocumentForm } from '../DocumentItem.types';
import { DOCUMENT_ITEM_FIELDS } from '../DocumentItems.constants';

export const checkDocumentFormError = (
  documentForm: TDocumentForm,
  formatError: (name: string) => string
): TDocumentErrors => {
  const errors = {};
  if (!documentForm[DOCUMENT_ITEM_FIELDS.NAME])
    errors[DOCUMENT_ITEM_FIELDS.NAME] = formatError('name');
  return errors;
};
