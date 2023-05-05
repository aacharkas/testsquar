import { UOM_FIELDS } from '../UOM.constants';
import type { TUOM, TUOMErrors, TUOMForm } from '../UOM.types';

export const checkUOMFormError = (
  UOMForm: TUOMForm,
  formatError: (name: string, field: string) => string
): TUOMErrors => {
  const errors = {};
  if (!UOMForm[UOM_FIELDS.UNIT_NAME])
    errors[UOM_FIELDS.UNIT_NAME] = formatError('IM0001', 'Unit Name');
  if (!UOMForm[UOM_FIELDS.ABBREVIATION])
    errors[UOM_FIELDS.ABBREVIATION] = formatError('IM0001', 'Abbreviation');
  return errors;
};

export const formatGetData = (UOM: TUOM): TUOMForm => {
  return {
    [UOM_FIELDS.ID]: UOM?.id,
    [UOM_FIELDS.UNIT_NAME]: UOM?.name,
    [UOM_FIELDS.ABBREVIATION]: UOM?.abbreviation,
  };
};

export const formatCreateData = (UOMForm: TUOMForm) => {
  return {
    [UOM_FIELDS.UNIT_NAME]: UOMForm[UOM_FIELDS.UNIT_NAME],
    [UOM_FIELDS.ABBREVIATION]: UOMForm[UOM_FIELDS.ABBREVIATION],
  };
};

export const formatEditData = (originalUOM: TUOM, UOMForm: TUOMForm) => {
  const editResult = {};
  const compareMainValues = (originalName: string, name: string): void => {
    if (originalUOM[originalName] !== UOMForm[name]) {
      editResult[originalName] = UOMForm[name];
    }
  };

  compareMainValues('name', UOM_FIELDS.UNIT_NAME);
  compareMainValues('abbreviation', UOM_FIELDS.ABBREVIATION);

  return editResult;
};
