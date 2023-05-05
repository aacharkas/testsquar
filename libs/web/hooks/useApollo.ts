import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RestLink } from 'apollo-link-rest';
import Router from 'next/router';
import { useMemo } from 'react';

import { ROUTES } from '../../../apps/squaredash-web/constants/routes';
import * as typePolicies from '../../../apps/squaredash-web/lib/typePolicies';
import {
  varToken,
  varUserId,
} from '../../../apps/squaredash-web/lib/variables';
import { getError } from '../helpers/transformErrors';

const SSR = typeof window === 'undefined';

function redirectToLogin() {
  varToken(undefined);
  varUserId(undefined);
  Router.replace(`/${ROUTES.SIGNIN}`);
}

function createApolloClient() {
  const cache = new InMemoryCache({
    typePolicies,
  });

  const linkRest = new RestLink({
    uri: process.env.NX_API_URL,
    credentials: 'same-origin',
    // credentials: 'include',
    bodySerializers: {
      fileEncode: (data, headers) => {
        headers.set(
          'Content-Disposition',
          'attachment; filename=' + encodeURIComponent(data.draftFileName)
        );
        headers.set('Content-Type', 'application/octet-stream');
        headers.set('Access-Control-Allow-Origin', '*');
        return { body: data.file, headers };
      },
      fileEncodeViewOnly: (data, headers) => {
        headers.set('Content-Disposition', 'inline; filename=' + data.name);
        headers.set('Content-Type', 'application/pdf');
        headers.set('Access-Control-Allow-Origin', '*');
        return { body: data, headers };
      },
      uploadFile: (data, headers) => {
        headers.set('Content-Disposition', 'form-data; images=' + data);
        headers.set('Access-Control-Allow-Origin', '*');
        return { body: data, images: data.name, headers };
      },
    },
    endpoints: {
      squareDash: process.env.NX_API_URL,
      empty: ' ',
    },
  });

  const linkError = onError(({ networkError, operation, forward }) => {
    if (networkError) {
      console.log('networkError.message', networkError.message);
      networkError.message = getError(networkError);
    }
    if (
      ['COMPANY_SIGN_UP', 'VERIFY_EMAIL', 'SIGN_IN', 'SIGN_UP'].includes(
        operation.operationName
      )
    ) {
      return;
    }

    if (operation.operationName === 'GET_NEW_TOKEN') {
      return redirectToLogin();
    }

    if (networkError) {
      //@ts-ignore
      switch (networkError?.statusCode) {
        case 401: {
          // return promiseToObservable(async () => {
          //   await client.mutate({
          //     mutation: GET_NEW_TOKEN,
          //     variables: { input: { refresh: varToken()?.refreshToken } },
          //   });
          // }).flatMap(() => forward(operation));
          redirectToLogin();
          break;
        }
        case 403: {
          // return redirectAccessDenied();
          redirectToLogin();
          break;
        }
        default:
        // console.error(networkError);
        // return notification.error({
        //   message: 'Oops. Something went wrong',
        //   description: (
        //     <div style={{ maxHeight: 200, overflow: 'scroll' }}>
        //       {networkError?.result?.detail ||
        //         networkError?.result?.title ||
        //         networkError?.result}
        //     </div>
        //   ),
        //   placement: 'bottomLeft',
        // });
      }
    }
  });

  const authLink = setContext((_, { headers }) => {
    if (_.operationName !== 'UPLOAD_FILE') {
      return {
        headers: {
          ...headers,
          Authorization: varToken()?.accessToken
            ? ` ${varToken()?.accessToken}`
            : undefined,
        },
        fetchOptions: {
          mode: 'no-cors',
        },
      };
    }
  });

  const client = new ApolloClient({
    link: from([linkError, authLink, linkRest]),
    cache,
    ssrMode: SSR,
  });

  return client;
}

let apolloClient;
function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // if your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.restore({ ...existingCache, ...initialState });
  }

  // for SSG and SSR always create a new Apollo Client
  if (SSR) {
    return _apolloClient;
  }

  // create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState = null) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
