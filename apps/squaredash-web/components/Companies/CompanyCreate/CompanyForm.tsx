import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Modal from '../../../../../libs/web/components/Modal/Modal';
import Select from '../../../../../libs/web/components/Select/Select';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../../libs/web/constants/enums';
import { ErrorMessage } from '../../Components/ErrorMessage';
import ImageInput from '../../ImageInput/ImageInput';
import { UPLOAD_INSTANCE } from '../../ImageInput/ImageInput.constants';
import {
  AWARENESS_OPTIONS, COMPANY_PROFILE_FIELDS,
  JOBS_AMOUNT,
  PEOPLE_AMOUNT,
} from '../CompanyProfile/CompanyProfile.constants';
import { COMPANY_FIELDS } from './CompanyForm.constants';
import useCompanyFormData from './hooks/useCompanyFormData';

const CompanyForm = () => {
  const {
    localActions,
    localState,
    handlers,
    formattedData,
    localErrorText,
  } = useCompanyFormData();

  const { t } = useTranslation(['companies', 'system_errors']);

  return (
    <div className="relative">
      {formattedData?.loading && <Spinner contentSize />}
      <div className="p-8 bg-white rounded-lg shadow-sm">
        <Typography variant={ETextVariant.lg} medium>
          {t('new_company')}
        </Typography>
        <Typography variant={ETextVariant.sm} className="mt-8">
          {t('logo')} <span className="text-gray-500">({t('optional')})</span>
        </Typography>
        <ImageInput
          src={localState?.companyForm[COMPANY_FIELDS.COMPANY_AVATAR_LINK] as string}
          alt={
            (localState?.companyForm[COMPANY_FIELDS.COMPANY_NAME] as string) ||
            'company-logo'
          }
          handleUploadImage={handlers.handleUploadAvatar}
          instance={UPLOAD_INSTANCE.COMPANY}
          className="mb-6"
          error={
            !!localState.companyFormErrors[
              COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK
            ]
          }
          errorText={localErrorText(
            localState.companyFormErrors[
              COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK
            ],
            COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK
          )}
        />
        <Input
          label={t('company_name')}
          className="w-2/5 md:w-2/3 sm:w-full"
          onChangeText={(e) =>
            handlers.handleChange(e?.target?.value, COMPANY_FIELDS.COMPANY_NAME)
          }
          value={localState?.companyForm[COMPANY_FIELDS.COMPANY_NAME] as string}
          error={!!localState?.companyFormErrors[COMPANY_FIELDS.COMPANY_NAME]}
          errorText={localErrorText(
            localState?.companyFormErrors[COMPANY_FIELDS.COMPANY_NAME],
            COMPANY_FIELDS.COMPANY_NAME
          )}
          maxLength={200}
        />
        <Input
          label={t('owners_full_name')}
          className="w-2/5 md:w-2/3 sm:w-full mt-6"
          onChangeText={(e) =>
            handlers.handleChange(e?.target?.value, COMPANY_FIELDS.OWNER_NAME)
          }
          value={localState?.companyForm[COMPANY_FIELDS.OWNER_NAME] as string}
          error={!!localState?.companyFormErrors[COMPANY_FIELDS.OWNER_NAME]}
          errorText={localErrorText(
            localState?.companyFormErrors[COMPANY_FIELDS.OWNER_NAME],
            COMPANY_FIELDS.OWNER_NAME
          )}
          maxLength={200}
        />
        <Input
          label={t('owners_work_email')}
          className="w-2/5 md:w-2/3 sm:w-full mt-6"
          onChangeText={(e) =>
            handlers.handleChange(e?.target?.value, COMPANY_FIELDS.OWNER_EMAIL)
          }
          value={localState?.companyForm[COMPANY_FIELDS.OWNER_EMAIL] as string}
          error={!!localState?.companyFormErrors[COMPANY_FIELDS.OWNER_EMAIL]}
          errorText={localErrorText(
            localState?.companyFormErrors[COMPANY_FIELDS.OWNER_EMAIL],
            COMPANY_FIELDS.OWNER_EMAIL
          )}
          maxLength={200}
        />
        <Select
          label={`${t('how_many_people_in_the_company')}?`}
          rightLabel={`(${t('optional')})`}
          options={PEOPLE_AMOUNT}
          placeholder="Select..."
          isDisabled={formattedData?.loading}
          value={localState?.companyForm[COMPANY_FIELDS.COMPANY_EMPLOYEES] as string}
          onChangeValue={(e) => {
            handlers.handleChange(e, COMPANY_FIELDS.COMPANY_EMPLOYEES);
          }}
          error={!!localState?.companyFormErrors[COMPANY_FIELDS.COMPANY_EMPLOYEES]}
          errorText={localErrorText(
            localState?.companyFormErrors[COMPANY_FIELDS.COMPANY_EMPLOYEES],
            COMPANY_FIELDS.COMPANY_EMPLOYEES
          )}
          className="w-2/5 md:w-2/3 sm:w-full mt-10"
        />
        <Select
          label={`${t('how_many_jobs_per_month')}?`}
          rightLabel={`(${t('optional')})`}
          options={JOBS_AMOUNT}
          placeholder="Select..."
          isDisabled={formattedData?.loading}
          value={localState?.companyForm[COMPANY_FIELDS.COMPANY_JOBS] as string}
          onChangeValue={(e) => {
            handlers.handleChange(e, COMPANY_FIELDS.COMPANY_JOBS);
          }}
          error={!!localState?.companyFormErrors[COMPANY_FIELDS.COMPANY_JOBS]}
          errorText={localErrorText(
            localState?.companyFormErrors[COMPANY_FIELDS.COMPANY_JOBS],
            COMPANY_FIELDS.COMPANY_JOBS
          )}
          className="w-2/5 md:w-2/3 sm:w-full mt-6"
        />
        <Select
          label={`${t('heard_from')}?`}
          rightLabel={`(${t('optional')})`}
          options={AWARENESS_OPTIONS}
          placeholder="Select..."
          isDisabled={formattedData?.loading}
          value={localState?.companyForm[COMPANY_FIELDS.COMPANY_COME_FROM] as string}
          onChangeValue={(e) => {
            handlers.handleChange(e, COMPANY_FIELDS.COMPANY_COME_FROM);
          }}
          error={!!localState?.companyFormErrors[COMPANY_FIELDS.COMPANY_COME_FROM]}
          errorText={localErrorText(
            localState?.companyFormErrors[COMPANY_FIELDS.COMPANY_COME_FROM],
            COMPANY_FIELDS.COMPANY_COME_FROM
          )}
          className="w-2/5 md:w-2/3 sm:w-full mt-6 mb-10"
        />
        <ErrorMessage formError={localState?.companyFormErrors} t={t} />
        <div>
          <Button
            theme="light"
            size="big"
            onClick={() => localActions?.setOpenCancelModal(true)}
            className="mr-2"
          >
            {t('cancel')}
          </Button>
          <Button size="big" onClick={handlers.handleSubmitClick}>
            {t('save')}
          </Button>
        </div>
        <Modal
          show={formattedData?.openCancelModal}
          closeModal={handlers.handleCloseCancelModal}
          secondButtonAction={handlers.handleCancelButton}
          firstButtonText={t('cancel')}
          secondButtonText={t('discard')}
        >
          <Typography variant={ETextVariant.lg} medium>
            {t('IM0010', { ns: 'system_errors' })}
          </Typography>
        </Modal>
      </div>
    </div>
  );
};

export default CompanyForm;
