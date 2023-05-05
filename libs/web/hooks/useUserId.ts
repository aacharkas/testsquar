import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';

import { varUserId } from '../../../apps/squaredash-web/lib/variables';

try {
  varUserId(JSON.parse(localStorage.getItem('UserId')));
} catch (error) {
  varUserId(undefined);
}

export function useUserId() {
  const userId = useReactiveVar(varUserId);

  useEffect(() => {
    localStorage.setItem('UserId', JSON.stringify(userId));
  }, [userId]);

  return userId;
}

export const cleanId = async () => {
  await localStorage.removeItem('UserId');
};
