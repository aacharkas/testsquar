import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';

import { varToken } from '../../../apps/squaredash-web/lib/variables';

try {
  varToken(JSON.parse(localStorage.getItem('Token')));
} catch (error) {
  varToken(undefined);
}

export function useToken() {
  const token = useReactiveVar(varToken);

  useEffect(() => {
    localStorage.setItem('Token', JSON.stringify(token));
  }, [token]);

  return token;
}

export const cleanJWT = async () => {
  await localStorage.removeItem('Token');
};
