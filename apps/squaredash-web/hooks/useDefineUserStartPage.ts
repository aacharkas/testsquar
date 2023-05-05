import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { useToken } from '../../../libs/web/hooks/useToken';
import { GET_USER } from '../components/Layout/Header/Header.api';
import { PERMISSIONS, PERMISSION_ACTIONS } from '../constants/permissions';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';
import { ability } from '../lib/ability';

export const useDefineUserStartPage = () => {
  const router = useRouter();
  const [isLoginRedirect, setIsLoginRedirect] = useState<boolean>(false);
  const { loading, data } = useQuery(GET_USER, {
    skip: !useToken(),
  });

  useEffect(() => {
    if (data && isLoginRedirect) {
      if (
        !data?.get_user?.finishedOnboarding &&
        ability.can(PERMISSION_ACTIONS.ALL, ROLES.COMPANY_OWNER)
      ) {
        router.push(`/${ROUTES.COMPANY_SIGNUP}?token=redirect`);
      } else if (ability.can(PERMISSION_ACTIONS.GET, PERMISSIONS.DASHBOARD)) {
        router.push(`/${ROUTES.DASHBOARD}`);
      } else if (
        ability.can(PERMISSION_ACTIONS.GET, PERMISSIONS.COMPANY_LIST)
      ) {
        router.push(`/${ROUTES.COMPANIES}`);
      } else if (ability.can(PERMISSION_ACTIONS.GET, PERMISSIONS.COMPANY)) {
        router.push(`/${ROUTES.PROFILE}`);
      } else if (ability.can(PERMISSION_ACTIONS.GET, PERMISSIONS.USER_LIST)) {
        router.push(`/${ROUTES.MEMBERS}`);
      } else if (
        ability.can(PERMISSION_ACTIONS.GET, PERMISSIONS.SUPER_ADMIN_LIST)
      ) {
        router.push(`/${ROUTES.ADMINS}`);
      } else {
        router.push(`/${ROUTES.CLAIM_ITEMS}`);
      }
    }
  }, [isLoginRedirect, data, router]);

  const redirectUserStartPage = useCallback(() => {
    setIsLoginRedirect(true);
  }, []);

  return {
    redirectUserStartPage,
    loading,
  };
};
