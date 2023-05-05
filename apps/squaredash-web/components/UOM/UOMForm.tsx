import { useTranslation } from 'next-i18next';
import React from 'react';

import Input from '../../../../libs/web/components/Input/Input';
import { ErrorMessage } from '../Components/ErrorMessage';
import { UOM_FIELDS } from './UOM.constants';
import { TUOMErrors, TUOMForm } from './UOM.types';

interface IProps {
  handlers: {
    handleChange: (value, name: string) => void;
  };
  localState: {
    UOMForm: TUOMForm;
    UOMFormErrors: TUOMErrors;
  };
  localErrorText: (text: string, field: string) => string;
}

const UOMForm = ({ handlers, localState, localErrorText }: IProps) => {
  const { t } = useTranslation(['uom', 'system_errors']);

  return (
    <div className="mt-8 bg-white">
      <div className="max-w-md flex flex-col gap-6 md:m-auto">
        <Input
          maxLength={100}
          label={t('unit_name')}
          value={localState?.UOMForm[UOM_FIELDS.UNIT_NAME] as string}
          onChangeText={(e) =>
            handlers?.handleChange(e?.target?.value, UOM_FIELDS.UNIT_NAME)
          }
          error={!!localState?.UOMFormErrors?.[UOM_FIELDS.UNIT_NAME]}
          errorText={localErrorText(
            localState?.UOMFormErrors?.[UOM_FIELDS.UNIT_NAME],
            t('unit_name')
          )}
        />
        <Input
          maxLength={5}
          label={t('abbreviation')}
          value={localState?.UOMForm[UOM_FIELDS.ABBREVIATION] as string}
          onChangeText={(e) =>
            handlers?.handleChange(e?.target?.value, UOM_FIELDS.ABBREVIATION)
          }
          error={!!localState?.UOMFormErrors?.[UOM_FIELDS.ABBREVIATION]}
          errorText={localErrorText(
            localState?.UOMFormErrors?.[UOM_FIELDS.ABBREVIATION],
            t('abbreviation')
          )}
        />
        <ErrorMessage
          formError={localState?.UOMFormErrors}
          t={t}
        />
      </div>
    </div>
  );
};

export default UOMForm;
