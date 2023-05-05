import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useToken } from '../../../../../../libs/web/hooks/useToken';
import { cleanId, useUserId } from '../../../../../../libs/web/hooks/useUserId';
import { PERMISSION_ACTIONS } from '../../../../constants/permissions';
import { ROLES } from '../../../../constants/roles';
import { ROUTES } from '../../../../constants/routes';
import { USER_STATUSES } from '../../../../constants/userStatuses';
import { useAbility } from '../../../../lib/ability';
import { varToken, varUserId } from '../../../../lib/variables';
import { SMALL_SCREEN_SIZE } from '../../../ChangePassword/ChangePassword.constants';
import { GET_USER, LOG_OUT } from '../Header.api';
import { DEFAULT_USER } from '../Header.constants';
import { formatGetData } from './useHeaderData.helper';

export const useHeaderData = () => {
  const router = useRouter();
  const userId = useUserId();
  const ability = useAbility();
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

  const [logOut, { client, loading: loadingSignOut }] = useMutation(LOG_OUT);
  const { data, loading: loadingUser } = useQuery(GET_USER, {
    skip: !useToken(),
  });

  const userData = useMemo(
    () => (data ? formatGetData(data?.get_user) : DEFAULT_USER),
    [data]
  );

  const editAccountLink = useMemo(
    () =>
      ability.can(PERMISSION_ACTIONS.ALL, ROLES.INITIAL_ADMIN) ||
      ability.can(PERMISSION_ACTIONS.ALL, ROLES.SUPER_ADMIN)
        ? `/${ROUTES.ADMIN}?id=${userData.id}`
        : `/${ROUTES.MEMBER}?id=${userData.id}`,
    [ability, userData?.id]
  );

  useEffect(() => {
    if (data) {
      if (!(data?.get_user?.status === USER_STATUSES.ACTIVE)) {
        varToken(undefined);
        varUserId(undefined);
        client.resetStore();
        router.push(`/${ROUTES.INVITATION_EMAIL}`);
      }
    }
  }, [client, data, router]);

  const handleChangePassword = () => {
    if (window.screen.width < SMALL_SCREEN_SIZE) {
      router.push(`/${ROUTES.CHANGE_PASSWORD}`);
    } else {
      setOpenChangePassword(true);
    }
  };

  const onLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      captureSentryError(error, userId);
      console.log('Log out Error');
    } finally {
      await client.cache.reset();
      varToken(undefined);
      varUserId(undefined);
      cleanId();
      await router.push(`/${ROUTES.SIGNIN}`);
    }
  };

  return {
    onLogOut,
    editAccountLink,
    loading: loadingUser || loadingSignOut,
    setOpenChangePassword,
    handleChangePassword,
    openChangePassword,
    userData,
  };
};
