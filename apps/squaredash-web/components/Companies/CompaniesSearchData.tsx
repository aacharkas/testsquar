import { useTranslation } from 'next-i18next';
import React from 'react';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { TCompany } from './Companies.types';

interface IProps {
  data: TCompany[];
}

const CompaniesSearchData = ({ data }: IProps) => {
  const { t } = useTranslation('companies');

  return (
    <>
      {data?.length ? (
        data?.map((item) => {
          return (
            <div
              className="flex p-4 items-center border-b border-gray-100"
              key={item.id as string}
            >
              <Avatar size="medium" shape="square" image={item?.avatar} />
              <Typography variant={ETextVariant.sm} medium className="ml-4">
                {item.name}
              </Typography>
            </div>
          );
        })
      ) : (
        <Typography
          variant={ETextVariant.sm}
          color={ETextColor.gray}
          className="flex justify-center mt-6"
        >
          {t('no_companies')}
        </Typography>
      )}
    </>
  );
};

export default CompaniesSearchData;
