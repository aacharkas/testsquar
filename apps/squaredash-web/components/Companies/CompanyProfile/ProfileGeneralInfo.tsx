import {PencilIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';
import React from 'react';

import Badge from '../../../../../libs/web/components/Badge/Badge';
import Button from '../../../../../libs/web/components/Button/Button';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {STATUSES_LABELS} from '../../../../../libs/web/constants/constants';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import {COMPANY_PROFILE_FIELDS} from './CompanyProfile.constants';
import {TCompany} from './CompanyProfile.types';
import CompanyProfileLogo from './CompanyProfileLogo';

interface IProps {
  company: TCompany;
  isMoreDetailed: boolean;
  setEditMode: (boolean) => void;
}

const ProfileGeneralInfo = ({
  company,
  isMoreDetailed,
  setEditMode,
}: IProps) => {
  const {t} = useTranslation('companies');
  return (
    <article className="flex mt-6 sm:mt-4">
      <CompanyProfileLogo
        src={company[COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK]}
        alt={company[COMPANY_PROFILE_FIELDS.COMPANY_NAME]}
      />
      <div className="mx-6 sm:mx-5">
        <div
          className='flex items-center'
        >
          <Typography variant={ETextVariant.xl_3} bold className="mr-3 sm:mr-1">
            {company[COMPANY_PROFILE_FIELDS.COMPANY_NAME]}
          </Typography>
          {isMoreDetailed ? (
            <Badge status={company[COMPANY_PROFILE_FIELDS.COMPANY_STATUS]}>
              {STATUSES_LABELS[company[COMPANY_PROFILE_FIELDS.COMPANY_STATUS]]}
            </Badge>
          ) : (
            <Button icon onClick={() => setEditMode(true)}>
              <PencilIcon className="h-6 w-6 sm:h-5 sm:w-5"/>
            </Button>
          )}
        </div>
        <div className="mb-4">
          <Typography variant={ETextVariant.base} medium>
            {t('legal_name')}:{' '}
            {company[COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME]}
          </Typography>
        </div>
        <div className="flex sm:block">
          <div>
            <Typography
              variant={ETextVariant.sm}
              color={ETextColor.gray}
              medium
            >
              {t('owners')}:
            </Typography>
            <div>
              {company[COMPANY_PROFILE_FIELDS.COMPANY_OWNERS] &&
                company[COMPANY_PROFILE_FIELDS.COMPANY_OWNERS]
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
            {company[COMPANY_PROFILE_FIELDS.COMPANY_OWNERS_COUNT] > 3 && (
              <Typography
                variant={ETextVariant.sm}
                color={ETextColor.gray}
                medium
              >
                {`+ ${company[COMPANY_PROFILE_FIELDS.COMPANY_OWNERS_COUNT] - 3} `}
                {t('others')}
              </Typography>
            )}
          </div>
          {isMoreDetailed && (
            <div className="ml-48 lg:ml-44 md:ml-40 sm:ml-0 sm:mt-4">
              <Typography
                variant={ETextVariant.sm}
                color={ETextColor.gray}
                medium
              >
                {t('people_in_the_company')}:
              </Typography>
              <Typography
                variant={ETextVariant.sm}
                medium
                className="mt-1 mb-4"
              >
                {company[COMPANY_PROFILE_FIELDS.COMPANY_EMPLOYEES]}
              </Typography>
              <Typography
                variant={ETextVariant.sm}
                color={ETextColor.gray}
                medium
              >
                {t('insurance_jobs_per_month')}:
              </Typography>
              <Typography
                variant={ETextVariant.sm}
                medium
                className="mt-1 mb-4"
              >
                {company[COMPANY_PROFILE_FIELDS.COMPANY_JOBS]}
              </Typography>
              <Typography
                variant={ETextVariant.sm}
                color={ETextColor.gray}
                medium
              >
                {t('heard_from')}:
              </Typography>
              <Typography variant={ETextVariant.sm} medium className="mt-1">
                {company[COMPANY_PROFILE_FIELDS.COMPANY_COME_FROM]}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProfileGeneralInfo;
