import { Config } from './config';

export const generateSetCookiesHeader = (tokens: {
  refreshToken: string;
  accessToken: string;
}): string[] => {
  return [
    `refresh_token=${
      tokens.refreshToken
    }; Domain=${getEnvNameForCookie()}.squaredash.com; HttpOnly; Path=/; Max-Age=${2400000}`,
    `access_token=${
      tokens.accessToken
    }; domain=${getEnvNameForCookie()}.squaredash.com; HttpOnly; SameSite=Lax; Secure; Path=/; Max-Age=${
      Config.JWT.expiresIn
    }`,
  ];
};

function getEnvNameForCookie() {
  switch (Config.APP.environment) {
    case 'development':
      return 'dev';
    case 'qa':
      return 'qa';
    case 'uat':
      return 'uat';
    default:
      return '';
  }
}
