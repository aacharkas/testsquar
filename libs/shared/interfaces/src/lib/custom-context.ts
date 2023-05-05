import { Context } from 'aws-lambda';

import { USER_ROLE } from '@squaredash/shared/constants';

export interface CustomContext extends Context {
  user: {
    id: string;
    role: USER_ROLE;
    companyId?: string;
  };
}
