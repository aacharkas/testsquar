import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useAppPageLoading = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(null);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.asPath && setLoading(true);
      setLoadingTimeout(setTimeout(() => setLoading(false), 3000));
    };
    const handleComplete = (url) => {
      if (url === router.asPath) {
        setLoading(false);
        clearTimeout(loadingTimeout);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return loading;
};
