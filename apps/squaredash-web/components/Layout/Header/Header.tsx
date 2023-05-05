import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Avatar from '../../../../../libs/web/components/Avatar/Avatar';
import Dropdown from '../../../../../libs/web/components/Dropdown/Dropdown';
import DropdownItem from '../../../../../libs/web/components/Dropdown/DropdownItem';
import Message from '../../../../../libs/web/components/Message/Message';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { Can } from '../../../lib/ability';
import ChangePasswordModal from '../../ChangePassword/ChangePasswordModal';
import { DEFAULT_IMAGE, USER_FIELDS } from './Header.constants';
import { useHeaderData } from './hooks/useHeaderData';
import {ROUTES} from '../../../constants/routes';

const Header = () => {
  const { t } = useTranslation(['buttons']);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const {
    onLogOut,
    setOpenChangePassword,
    openChangePassword,
    userData,
    loading,
    handleChangePassword,
    editAccountLink,
  } = useHeaderData();

  return (
    <>
      <header className="p-4 justify-end flex shadow-sm">
        <Dropdown
          mobileDisplayType="dropdown"
          button={
            <Avatar
              size="medium"
              image={(userData[USER_FIELDS.AVATAR] as string) || DEFAULT_IMAGE}
            />
          }
        >
          <DropdownItem className="min-w-[344px] h-[90px]">
            <Avatar
              size="medium"
              image={(userData[USER_FIELDS.AVATAR] as string) || DEFAULT_IMAGE}
            />
            <div className="flex items-start flex-col ml-4 text-left">
              <Typography variant={ETextVariant.sm} medium>
                {userData[USER_FIELDS.NAME]}
              </Typography>
              <Typography
                variant={ETextVariant.sm}
                color={ETextColor.gray}
                className="text-left"
              >
                {userData[USER_FIELDS.EMAIL]}
              </Typography>
            </div>
          </DropdownItem>
          <DropdownItem className="min-w-[344px] h-[44px]" href={editAccountLink}>
            <Typography
              variant={ETextVariant.sm}
              color={ETextColor.gray}
              medium
            >
              {t('edit_account')}
            </Typography>
          </DropdownItem>
          <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.USER_PROFILE}>
            <DropdownItem className="min-w-[344px] h-[44px]" href={`/${ROUTES.PROFILE}`}>
              <Typography
                variant={ETextVariant.sm}
                color={!process.env.NX_ALFA_VERSIO && ETextColor.gray}
                medium
              >
                {t('profile')}
              </Typography>
            </DropdownItem>
          </Can>
          <DropdownItem
            className="min-w-[344px] h-[44px]"
            onClick={() => handleChangePassword()}
          >
            <Typography
              variant={ETextVariant.sm}
              medium
              color={ETextColor.gray}
            >
              {t('change_password')}
            </Typography>
          </DropdownItem>
          <DropdownItem onClick={onLogOut} className="min-w-[344px] h-[48px]">
            <Typography
              variant={ETextVariant.sm}
              color={ETextColor.gray}
              medium
            >
              {loading ? <Spinner size="xsmall" /> : t('log_out')}
            </Typography>
          </DropdownItem>
        </Dropdown>
      </header>
      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        onSuccess={() => setOpenMessage(true)}
      />
      <Message show={openMessage} closeMessage={() => setOpenMessage(false)}>
        <Typography variant={ETextVariant.sm} medium>
          {t('password_updated')}
        </Typography>
      </Message>
    </>
  );
};

export default Header;
