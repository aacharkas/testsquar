import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import Textarea from 'libs/web/components/Textarea/Textarea';
import { ETextVariant } from '../../../../../libs/web/constants/enums';

const NoteForm = () => {
  const { t } = useTranslation('notes');
  const isEditMode = false;
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <div className="max-w-md flex flex-col gap-6 md:m-auto">
        <Typography variant={ETextVariant.xl_2} medium className="mr-4">
          {isEditMode ? t('edit_note') : t('new_note')}
        </Typography>
        <Input
          label={t('note_name')}
        />
      </div>
      <div className='py-8'>
        <Textarea name="Textarea" placeholder={t('textarea_placeholder')}/>
      </div>
      
      <div className="flex flex-1 gap-3">
        <Button
          theme="light"
          className="md:flex-1"
        >
          <Typography variant={ETextVariant.base}>{t('cancel')}</Typography>
        </Button>
        <Button
          className="md:flex-1"
        >
          <Typography variant={ETextVariant.base}>{t('create')}</Typography>
        </Button>
      </div>
    </div>
  );
};

export default NoteForm;
