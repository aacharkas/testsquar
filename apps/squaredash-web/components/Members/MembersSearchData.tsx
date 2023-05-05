import { useTranslation } from 'next-i18next';
import React from 'react';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { TMemberForm } from './Member/MemberForm.types';
import { getMemberInitials } from './Members.helper';

interface IProps {
  data: TMemberForm[];
}

const MembersSearchData = ({ data }: IProps) => {
  const { t } = useTranslation('members');

  return (
    <>
      {data?.length ? (
        data?.map((item) => {
          return (
            <div
              className="flex p-4 items-center border-b border-gray-100"
              key={item.id as string}
            >
              <Avatar size="medium" initials={getMemberInitials(item)} />
              <Typography variant={ETextVariant.sm} medium className="ml-4">
                {item?.name as string}
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
          {t('no_members')}
        </Typography>
      )}
    </>
  );
};

export default MembersSearchData;
