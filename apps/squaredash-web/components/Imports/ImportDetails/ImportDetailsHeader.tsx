import React, {useMemo} from 'react';
import {useTranslation} from 'next-i18next';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../../libs/web/constants/enums';
import Link from '../../Link';
import {ROUTES} from '../../../constants/routes';
import {ArrowLeftIcon, EllipsisVerticalIcon} from '@heroicons/react/24/outline';
import Button from '../../../../../libs/web/components/Button/Button';
import Dropdown from '../../../../../libs/web/components/Dropdown/Dropdown';
import DropdownItem from '../../../../../libs/web/components/Dropdown/DropdownItem';
import {getHeaderDropdowns} from './ImportDetails.helper';

interface IProps {
  isVerified: boolean,
  handleVerifyImport: () => any;
}

const ImportDetailsHeader = ({
  isVerified,
  handleVerifyImport,
}: IProps): JSX.Element => {
  const {t} = useTranslation('imports');
  const dropdownItems = useMemo(
    () => getHeaderDropdowns({t}),
    [t]
  );

  return (
    <div className='flex items-center justify-between'>
      <Typography
        variant={ETextVariant.xl}
        medium
        className="flex items-center"
      >
        <Link type="tab" href={`/${ROUTES.IMPORTS}`}>
          <ArrowLeftIcon
            className="h-6 w-6 text-gray-500 ml-2 mr-4"
            aria-hidden="true"
          />
        </Link>
        {t('details')}
      </Typography>
      <div className='sm:hidden'>
        <Button theme='outline'>
          <Typography variant={ETextVariant.base}>{t('show_version_history')}</Typography>
        </Button>
        <Button theme='dark' className='ml-4' onClick={isVerified ? () => null : handleVerifyImport}>
          <Typography variant={ETextVariant.base} className='flex items-center'>
            {isVerified ? t('create_job') : t('verify')}
          </Typography>
        </Button>
      </div>
      <div className='hidden sm:block mr-4'>
        <Dropdown
          mobileDisplayType="dropdown"
          button={
            <EllipsisVerticalIcon
              className="h-6 w-6 text-gray-500"
              aria-hidden="true"
            />
          }
        >
          {dropdownItems?.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                href={item.href}
              >
                <Typography
                  variant={ETextVariant.sm}
                  color={ETextColor.gray}
                  medium
                >
                  {item.title}
                </Typography>
              </DropdownItem>
            );
          })}
        </Dropdown>
      </div>
    </div>
  );
};

export default ImportDetailsHeader;
