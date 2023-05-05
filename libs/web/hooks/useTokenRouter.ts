import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useToken } from './useToken';

export function useTokenRouter(pageProps) {
  const jwt = useToken();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (jwt && Router.asPath === '/login') {
      setLoading(false);
      return;
    }

    if (!jwt && pageProps.private === true) {
      Router.replace('/login').then(() => {
        setLoading(false);
      });
      return;
    }

    setLoading(false);
  }, [jwt, pageProps.private]);

  return { loading };
}
