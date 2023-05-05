import {useTranslation} from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Select from '../../../../../libs/web/components/Select/Select';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {STATUSES_LABELS} from '../../../../../libs/web/constants/constants';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import {ErrorMessage} from '../../Components/ErrorMessage';
import ImageInput from '../../ImageInput/ImageInput';
import {UPLOAD_INSTANCE} from '../../ImageInput/ImageInput.constants';
import {
  AWARENESS_OPTIONS,
  COMPANY_PROFILE_FIELDS,
  JOBS_AMOUNT,
  PEOPLE_AMOUNT,
  STATUSES_OPTIONS,
} from './CompanyProfile.constants';
import {
  TCompanyDataAction,
  TCompanyDataFormattedDataUpdated,
  TCompanyDataHandlers,
} from './CompanyProfile.types';

interface IProps {
  formattedData: TCompanyDataFormattedDataUpdated;
  handlers: TCompanyDataHandlers;
  stateActions: TCompanyDataAction;
  localErrorText: (text: string, field: string) => string;
}

const ProfileGeneralInfoEditMode = ({
  formattedData,
  stateActions,
  handlers,
  localErrorText,
}: IProps) => {
  const {t} = useTranslation('companies');
  return (
    <article className="mt-6">
      <Typography variant={ETextVariant.sm}>
        {t('logo')} <span className="text-gray-500">({t('optional')})</span>
      </Typography>
      <ImageInput
        src={
          formattedData.companyForm[
            COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK
          ] as string
        }
        alt={
          (formattedData.companyForm[
            COMPANY_PROFILE_FIELDS.COMPANY_NAME
          ] as string) || 'user-image'
        }
        handleUploadImage={handlers.handleUploadAvatar}
        instance={UPLOAD_INSTANCE.COMPANY}
        className="mb-6"
        error={
          !!formattedData.companyFormErrors[
            COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK
          ]
        }
        errorText={localErrorText(
          formattedData.companyFormErrors[
            COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK
          ],
          COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK
        )}
      />
      <Input
        label={t('company_name')}
        className="w-2/5 md:w-2/3 sm:w-full"
        onChangeText={(e) =>
          handlers.handleChange(
            e?.target?.value,
            COMPANY_PROFILE_FIELDS.COMPANY_NAME
          )
        }
        value={
          formattedData.companyForm[
            COMPANY_PROFILE_FIELDS.COMPANY_NAME
          ] as string
        }
        error={
          !!formattedData.companyFormErrors[COMPANY_PROFILE_FIELDS.COMPANY_NAME]
        }
        errorText={localErrorText(
          formattedData.companyFormErrors[COMPANY_PROFILE_FIELDS.COMPANY_NAME],
          COMPANY_PROFILE_FIELDS.COMPANY_NAME
        )}
        maxLength={200}
      />
      <Input
        label={t('legal_name')}
        className="w-2/5 md:w-2/3 sm:w-full mt-4"
        onChangeText={(e) =>
          handlers.handleChange(
            e?.target?.value,
            COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME
          )
        }
        value={
          formattedData.companyForm[
            COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME
          ] as string
        }
        error={
          !!formattedData.companyFormErrors[
            COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME
          ]
        }
        errorText={localErrorText(
          formattedData.companyFormErrors[
            COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME
          ],
          COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME
        )}
        maxLength={200}
      />
      <Select
        label={t('status')}
        options={STATUSES_OPTIONS}
        placeholder="Select..."
        isDisabled={true}
        isVisible={formattedData.isMoreDetailed}
        value={
          STATUSES_LABELS[
            formattedData.companyForm[
              COMPANY_PROFILE_FIELDS.COMPANY_STATUS
            ] as string
          ]
        }
        defaultValue={
          STATUSES_LABELS[
            formattedData.companyForm[
              COMPANY_PROFILE_FIELDS.COMPANY_STATUS
            ] as string
          ]
        }
        onChangeValue={(e) => {
          handlers.handleChange(e, COMPANY_PROFILE_FIELDS.COMPANY_STATUS);
        }}
        className="w-1/6 md:w-1/3 sm:w-full mt-6"
      />
      <div className="mt-6 mb-9">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>
          {t('owners')}:
        </Typography>
        <div>
          {formattedData.companyForm[COMPANY_PROFILE_FIELDS.COMPANY_OWNERS]
            .slice(0, 3)
            .map((item) => (
              <Typography
                key={item.id}
                variant={ETextVariant.sm}
                className="mt-1"
                medium
              >
                {item.name}
              </Typography>
            ))}
        </div>
        {formattedData.companyForm[COMPANY_PROFILE_FIELDS.COMPANY_OWNERS]
          .length > 3 && (
          <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>
            +{' '}
            {
              formattedData.companyForm[
                COMPANY_PROFILE_FIELDS.COMPANY_OWNERS
              ].slice(3).length
            }{' '}
            {t('others')}
          </Typography>
        )}
      </div>
      <Select
        label={t('people_in_the_company') + ':'}
        options={PEOPLE_AMOUNT}
        placeholder="Select..."
        isDisabled={formattedData.loading}
        isVisible={formattedData.isMoreDetailed}
        value={
          formattedData.companyForm[
            COMPANY_PROFILE_FIELDS.COMPANY_EMPLOYEES
          ] as string
        }
        onChangeValue={(e) => {
          handlers.handleChange(e, COMPANY_PROFILE_FIELDS.COMPANY_EMPLOYEES);
        }}
        className="w-2/5 md:w-2/3 sm:w-full"
      />
      <Select
        label={t('insurance_jobs_per_month') + ':'}
        options={JOBS_AMOUNT}
        placeholder="Select..."
        isDisabled={formattedData.loading}
        isVisible={formattedData.isMoreDetailed}
        value={
          formattedData.companyForm[
            COMPANY_PROFILE_FIELDS.COMPANY_JOBS
          ] as string
        }
        onChangeValue={(e) => {
          handlers.handleChange(e, COMPANY_PROFILE_FIELDS.COMPANY_JOBS);
        }}
        className="w-2/5 md:w-2/3 sm:w-full mt-6"
      />
      <Select
        label={t('heard_from') + ':'}
        options={AWARENESS_OPTIONS}
        placeholder="Select..."
        isDisabled={formattedData.loading}
        isVisible={formattedData.isMoreDetailed}
        value={
          formattedData.companyForm[
            COMPANY_PROFILE_FIELDS.COMPANY_COME_FROM
          ] as string
        }
        onChangeValue={(e) => {
          handlers.handleChange(e, COMPANY_PROFILE_FIELDS.COMPANY_COME_FROM);
        }}
        className="w-2/5 md:w-2/3 sm:w-full mt-6 mb-8"
      />
      <ErrorMessage formError={formattedData.companyFormErrors} t={t}/>
      <div>
        <Button
          theme="light"
          size="big"
          onClick={() => stateActions.setOpenModal(true)}
          className="mr-2"
        >
          {t('cancel')}
        </Button>
        <Button size="big" onClick={handlers.handleSaveChanges}>
          {t('save')}
        </Button>
      </div>
    </article>
  );
};

export default ProfileGeneralInfoEditMode;
