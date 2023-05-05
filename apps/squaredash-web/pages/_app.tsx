import { ApolloProvider } from '@apollo/client';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, memo } from 'react';

import Spinner from '../../../libs/web/components/Spinner/Spinner';
import { useApollo } from '../../../libs/web/hooks/useApollo';
import { useAppPageLoading } from '../../../libs/web/hooks/useAppPageLoading';
import { useTokenRouter } from '../../../libs/web/hooks/useTokenRouter';
import '../../../libs/web/styles/global.css';
import { useAbilityAccount } from '../hooks/useAbilityAccount';
import { AbilityProvider } from '../lib/ability';
import { getStaticPaths, makeStaticProps } from '../lib/getStatic';
import './_app.styles.css';

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

const GlobalHooks = memo((info: { children: ReactElement }): ReactElement => {
  useAbilityAccount();
  return info?.children;
});
GlobalHooks.displayName = 'GlobalHooks';

function App({ Component, pageProps }: AppProps) {
  const apollo = useApollo();
  useTokenRouter(pageProps);
  const loading = useAppPageLoading();

  return (
    <>
      <AbilityProvider>
        <ApolloProvider client={apollo}>
          <GlobalHooks>
            <>
              <Head>
                <title>Squaredash</title>
              </Head>
              <main className="app">
                {loading && <Spinner contentSize />}
                <Component {...pageProps} />
              </main>
            </>
          </GlobalHooks>
        </ApolloProvider>
      </AbilityProvider>
    </>
  );
}

export default appWithTranslation(App);
