import { useTranslation } from 'next-i18next';
import React from 'react';

import Input from '../../../../libs/web/components/Input/Input';
import { DOCUMENT_ITEM_FIELDS } from './DocumentItems.constants';
import useDocumentItemData from './hooks/useDocumentItemData';


const DocumentItemsForm = () => {
  const { handleChange, documentItemForm,documentFormErrors } = useDocumentItemData();

  const { t } = useTranslation('documents');

  return (
    <div className="mt-8 bg-white">
      <div className="max-w-md flex flex-col gap-6 md:m-auto">
        <Input
          label={t('document_name')}
          onChangeText={(e) =>
            handleChange(e?.target?.value, DOCUMENT_ITEM_FIELDS.NAME)
          }
          value={documentItemForm[DOCUMENT_ITEM_FIELDS.NAME] as string}
          error={!!documentFormErrors[DOCUMENT_ITEM_FIELDS.NAME]}
          errorText={documentFormErrors[DOCUMENT_ITEM_FIELDS.NAME]}
        />
      </div>
    </div>
  );
};

export default DocumentItemsForm;
