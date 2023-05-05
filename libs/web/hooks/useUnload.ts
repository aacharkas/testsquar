import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useUnload = (initialValue?: boolean) => {
  const router = useRouter();
  const [isOpenWarning, setIsOpenWarning] = useState<string>('');
  const [updateState, setUpdateState] = useState<boolean>(
    initialValue || false
  );

  const exitingFunction = useCallback(
    (nextPath) => {
      if (updateState) {
        setIsOpenWarning(nextPath);
        router.events.emit('routeChangeError', router.asPath);
        // log to catch random bug with loader
        console.log('exitingFunction', router.asPath);
        throw 'cancelled route change';
      }
    },
    [updateState]
  );

  const openNextRoute = useCallback(() => {
    if (isOpenWarning) {
      router.push(isOpenWarning);
    }
  }, [isOpenWarning]);

  const removeNextRoute = () => {
    setIsOpenWarning('');
  };

  useEffect(() => {
    router.events.on('routeChangeStart', exitingFunction);

    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, [exitingFunction]);

  return {
    updateState,
    isOpenWarning: !!isOpenWarning,
    setUpdateState,
    openNextRoute,
    removeNextRoute,
  };
};
