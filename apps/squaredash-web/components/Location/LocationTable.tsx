import { PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { PERMISSIONS, PERMISSION_ACTIONS } from '../../constants/permissions';
import { ROUTES } from '../../constants/routes';
import { Can } from '../../lib/ability';
import { COMPANY_PROFILE_FIELDS } from '../Companies/CompanyProfile/CompanyProfile.constants';
import { TCompany } from '../Companies/CompanyProfile/CompanyProfile.types';
import Link from '../Link';
import LocationTableItem from './LocationTableItem';
import classNames from 'classnames';

interface IProps {
  loading: boolean;
  company: TCompany;
  handleAction: (any) => void;
  localErrorText?: (name: string, value: string) => string;
}

const LocationTable = ({ loading, company, handleAction, localErrorText }: IProps) => {
  const { t } = useTranslation('companies');
  const items = [t('office_name'), t('contact_email'), t('phone_number')];

  return (
    <div className="shadow rounded-md relative overflow-hidden">
      {loading && <Spinner contentSize />}
      <div className="border-b border-gray-200 bg-white px-6 py-6 sm:px-4 sm:pb-4 flex flex-wrap items-center justify-between sm:flex-nowrap sm:grid">
        <Typography variant={ETextVariant.lg} medium className="sm:mb-4">
          {t('locations')}
        </Typography>
        <Can I={PERMISSION_ACTIONS.CREATE} a={PERMISSIONS.COMPANY_LOCATION}>
          <Link
            type="tab"
            href={`/${ROUTES.LOCATION}?id=new&companyId=${company.id || ''}`}
            className="ml-4 mt-2 sm:m-0"
          >
            <Button size="small" theme={company.locations ? 'dark' : 'light'}>
              <PlusIcon className="h-6 w-6 mr-2" />
              <Typography variant={ETextVariant.base} medium>
                {t('add_location')}
              </Typography>
            </Button>
          </Link>
        </Can>
      </div>
      <TableHeader
        items={items}
        columnsSize={3}
        className={classNames('md:hidden sm:hidden', {
          'hidden': !company[COMPANY_PROFILE_FIELDS.COMPANY_LOCATIONS]?.length
        })}
        isFirstItemBig
      />
      <TableBody className={!company[COMPANY_PROFILE_FIELDS.COMPANY_LOCATIONS]?.length && 'hidden'}>
        {company[COMPANY_PROFILE_FIELDS.COMPANY_LOCATIONS] &&
            company[COMPANY_PROFILE_FIELDS.COMPANY_LOCATIONS].map((item) => (
              <LocationTableItem
                key={item.id}
                item={item}
                size={items.length}
                handleAction={handleAction}
                localErrorText={localErrorText}
              />
            ))}
      </TableBody>
    </div>
  );
};

export default LocationTable;
