import { APIGatewayEvent } from 'aws-lambda';

export const extractToken = (
  event: APIGatewayEvent,
  tokenName: string
): string | undefined => {
  if (event.headers.Cookie) {
    const cookies = event.headers.Cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === tokenName) {
        return value;
      }
    }
  }

  return event.headers.authorization || event.headers.Authorization;
};
