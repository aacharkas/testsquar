import { Config } from '@squaredash/shared/util';

export function getStage() {
  switch (Config.APP.environment) {
    case 'development': {
      return 'dev';
    }
    case 'qa':
    case 'uat': {
      return Config.APP.environment;
    }
    default: {
      return 'dev';
    }
  }
}
