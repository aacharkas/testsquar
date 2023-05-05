import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as companyService from '@squaredash/company';
import { RolePermission } from '@squaredash/role';
import * as roleService from '@squaredash/role';
import { UPLOAD_TYPE, USER_ROLE, User } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import {
  HTTP_STATUS,
  NotFoundException,
  getFileLink,
} from '@squaredash/shared/util';
import * as userService from '@squaredash/user';

const getProfile = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const profile = await userService.getById(context.user.id);
  if (!profile) {
    throw new NotFoundException('IM0053');
  }

  const permissions = roleService.getRolePermissionsByRole(context.user.role);

  const response: User & {
    permissions: RolePermission;
    avatar: string;
    finishedOnboarding?: boolean;
  } = {
    ...profile,
    permissions,
    avatar: getFileLink(profile.avatarId, UPLOAD_TYPE.USER_AVATAR),
  };

  if (profile.role === USER_ROLE.COMPANY_OWNER) {
    if (!profile.companyId) {
      response.finishedOnboarding = false;
    } else {
      const company = await companyService.getByIdWithMeta(profile.companyId);

      response.finishedOnboarding =
        Boolean(company.comeFrom) &&
        Boolean(company.numberOfEmployees) &&
        Boolean(company.numberOfInsuranceJobsPerMonth);
    }
  }

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('user_profile_get', getProfile))
);
