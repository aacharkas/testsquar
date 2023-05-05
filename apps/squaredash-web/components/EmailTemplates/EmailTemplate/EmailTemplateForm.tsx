import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import RichText from '../../../../../libs/web/components/RichText/RichText';
import Textarea from '../../../../../libs/web/components/Textarea/Textarea';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { TEMPLATE_FIELDS } from '../EmailTemplates.constants';
import { TEMPLATE_CUSTOM_FIELDS } from './EmailTemplateForm.constants';
import useEmailTemplateData from './hooks/useEmailTemplateData';
import {CustomFieldsPopover, CustomFieldsSideBar, InsertButton, BackToDefault} from './CustomFieldsComponents';
import Modal from '../../../../../libs/web/components/Modal/Modal';
import classNames from 'classnames';

const EmailTemplate = () => {
  const { t } = useTranslation(['email_templates', 'buttons', 'system_errors']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {localState, localActions, templateForm, handlers, checkTemplateForm, templateFormErrors, localErrorText, formattedData} = useEmailTemplateData();
  const handleTextAreaInsert = (value) => {
    handlers.handleChange(
      templateForm[TEMPLATE_FIELDS.SUBJECT] + value,
      TEMPLATE_FIELDS.SUBJECT
    );
  };

  const handleBackToDefaultSubject = () => {
    handlers.handleChange(
      templateForm[TEMPLATE_FIELDS.DEFAULT_SUBJECT],
      TEMPLATE_FIELDS.SUBJECT
    );
  };
  
  const handleBackToDefaultBtnText = () => {
    handlers.handleChange(
      templateForm[TEMPLATE_FIELDS.DEFAULT_BUTTON_TEXT],
      TEMPLATE_FIELDS.BUTTON_TEXT
    );
  };

  const displayButton = !['Certificate of completion', 'Release of undisputed funds'].includes(templateForm[TEMPLATE_FIELDS.NAME]);

  return (
    <div className="relative">
      {formattedData.loading && <Spinner contentSize />}
      <div className="p-8 bg-white rounded-lg shadow-sm sm:p-3">
        <div className="max-w-xl flex flex-col gap-6 md:m-auto">
          <Typography variant={ETextVariant.lg}>
            {t('edit_email_template')}
          </Typography>
          <Input
            label={t('template_name')}
            isDisabled
            value={templateForm[TEMPLATE_FIELDS.NAME] as string}
            className="w-4/5 sm:w-full"
          />
          <div className="relative flex sm:flex-col">
            <Textarea
              label={t('subject')}
              name="Textarea"
              maxLength={256}
              onChangeText={(e) =>
                handlers.handleChange(
                  e?.target?.value,
                  TEMPLATE_FIELDS.SUBJECT
                )
              }
              value={templateForm[TEMPLATE_FIELDS.SUBJECT] as string}
              error={!!templateFormErrors[TEMPLATE_CUSTOM_FIELDS.SUBJECT]}
              errorText={localErrorText(
                templateFormErrors[TEMPLATE_CUSTOM_FIELDS.SUBJECT],
                TEMPLATE_CUSTOM_FIELDS.SUBJECT
              )}
              className="w-4/5 sm:w-full"
              minHeight
            />
            <div 
              className={classNames('absolute bottom-2 sm:bottom-10 -left-2 w-4/5 sm:w-full', 
                {
                  'bottom-9 sm:bottom-[70px]': !!templateFormErrors[TEMPLATE_CUSTOM_FIELDS.SUBJECT],
                }
              )}
            >
              <div className="flex justify-end sm:hidden">
                <CustomFieldsPopover customFields={formattedData?.data?.customFields} onClick={handleTextAreaInsert} position='bottom' />
              </div>
              <div className="justify-end hidden sm:flex">
                <InsertButton onClick={() => setIsModalOpen(!isModalOpen)} />
              </div>
            </div>
            <BackToDefault onClick={handleBackToDefaultSubject} />
          </div>
          <div className="flex sm:flex-col">
            <RichText
              label={t('body')}
              className="w-4/5 sm:w-full"
              value={localState.bodyInitialValue as string}
              Popover={CustomFieldsPopover}
              SideBarContent={CustomFieldsSideBar}
              InsertButton={InsertButton}
              BackToDefault={BackToDefault}
              defaultText={templateForm[TEMPLATE_FIELDS.DEFAULT_BODY] as string}
              customFields={formattedData?.data?.customFields}
              onChangeText={(value) =>
                handlers.handleChange(
                  value,
                  TEMPLATE_FIELDS.BODY
                )
              }
              error={!!templateFormErrors[TEMPLATE_CUSTOM_FIELDS.BODY]}
              errorText={localErrorText(
                templateFormErrors[TEMPLATE_CUSTOM_FIELDS.BODY],
                TEMPLATE_CUSTOM_FIELDS.BODY
              )}
            />
          </div>
          {displayButton &&<div className="flex sm:flex-col">
            <Input
              label={t('button_text')}
              onChangeText={(e) =>
                handlers.handleChange(e?.target?.value, TEMPLATE_FIELDS.BUTTON_TEXT)
              }
              value={templateForm[TEMPLATE_FIELDS.BUTTON_TEXT] as string}
              error={!!templateFormErrors[TEMPLATE_CUSTOM_FIELDS.BUTTON_TEXT]}
              errorText={localErrorText(
                templateFormErrors[TEMPLATE_CUSTOM_FIELDS.BUTTON_TEXT],
                TEMPLATE_CUSTOM_FIELDS.BUTTON_TEXT
              )}
              maxLength={50}
              className="w-4/5 sm:w-full"
            />
            <BackToDefault onClick={handleBackToDefaultBtnText} />
          </div>}
          <ErrorMessage formError={templateFormErrors} t={t} />
          <div className="flex gap-3 flex-wrap-reverse">
            <div className="flex sm:flex-1 gap-3 sm:max-h-[40px]">
              <Button
                theme="light"
                className="md:flex-1 sm:flex-1"
                onClick={() => localActions.setOpenCancelModal(true)}
              >
                <Typography variant={ETextVariant.base}>
                  {t('cancel', {ns: 'buttons'})}
                </Typography>
              </Button>
              <Button
                className="md:flex-1 sm:flex-1"
                onClick={() => {
                  if (!checkTemplateForm())
                    handlers.handleSubmitClick();
                }}
              >
                <Typography variant={ETextVariant.base}>
                  {t('save', {ns: 'buttons'})}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CustomFieldsSideBar 
        isModalOpen={isModalOpen} 
        closeModal={() => setIsModalOpen(false)} 
        customFields={formattedData?.data?.customFields}
        onClick={handleTextAreaInsert}
      />
      <Modal
        show={localState.openCancelModal}
        closeModal={handlers.handleCloseCancelModal}
        secondButtonAction={handlers.handleCancelButton}
        firstButtonText={t('cancel', {ns: 'buttons'})}
        secondButtonText={t('discard', {ns: 'buttons'})}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('IM0010', { ns: 'system_errors' })}
        </Typography>
      </Modal>
    </div>
  );
};

export default EmailTemplate;
