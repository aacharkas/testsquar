import { useTranslation } from 'next-i18next';
import React from 'react';

import Badge from '../../../../libs/web/components/Badge/Badge';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { TCustomer } from './Customers.types';

interface IProps {
  data: TCustomer[];
}

const CustomersSearchData = ({ data }: IProps) => {
  const { t } = useTranslation('customers');

  return (
    <>
      {data?.length ? (
        data?.map((item) => {
          return (
            <div
              className="flex p-4 items-center border-b border-gray-100"
              key={item.id as string}
            >
              <Typography variant={ETextVariant.sm} medium className="ml-4">
                {item.displayName}
              </Typography>
              {item.parentId && (
                <Badge color="blue" className="ml-3">
                  {t('sub_customer')}
                </Badge>
              )}
            </div>
          );
        })
      ) : (
        <Typography
          variant={ETextVariant.sm}
          color={ETextColor.gray}
          className="flex justify-center mt-6"
        >
          {t('no_customers')}
        </Typography>
      )}
    </>
  );
};

export default CustomersSearchData;
