import * as Sentry from '@sentry/nextjs';
import { varUserId } from 'apps/squaredash-web/lib/variables';

type TErrorOptions = {
  extra?: {
    entityId: string;
    payload;
  };
  user?: {
    id: string;
  };
};

export function captureSentryError(error, extra = undefined, userId = '') {
  const id = userId || varUserId();
  const options = <TErrorOptions>{
    extra,
  };
  if (id) {
    options.user = {
      id,
    };
  }
  return Sentry.captureException(error, options);
}
