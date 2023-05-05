import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class SubscribeToChannelBody {
  @IsString()
  @IsNotEmpty()
  @IsIn(['subscribe-to-channel'])
  action: 'subscribe-to-channel';

  @IsString()
  @IsNotEmpty()
  channel: string;
}
