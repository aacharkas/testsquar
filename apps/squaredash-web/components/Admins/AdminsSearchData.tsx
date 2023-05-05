import { useTranslation } from 'next-i18next';
import React from 'react';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { getAdminInitials } from './Admins.helper';
import { Admin } from './Admins.types';

interface IProps {
  data: Admin[];
}

const AdminsSearchData = ({ data }: IProps) => {
  const { t } = useTranslation('admins');

  return (
    <>
      {data?.length ? (
        data?.map((item) => {
          return (
            <div
              className="flex p-4 items-center border-b border-gray-100"
              key={item.id as string}
            >
              <Avatar size="medium" initials={getAdminInitials(item)} />
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
          {t('no_admins')}
        </Typography>
      )}
    </>
  );
};

export default AdminsSearchData;
