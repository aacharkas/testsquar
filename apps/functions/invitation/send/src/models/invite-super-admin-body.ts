import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { InvitationSendBaseBody } from './invitation-send-base-body';

export class InviteSuperAdminBody extends InvitationSendBaseBody {
  @IsNotEmpty()
  @IsString()
  @IsIn(['SUPER_ADMIN'])
  role: 'SUPER_ADMIN';

  @IsString()
  @IsOptional()
  avatarId?: string;
}
