import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { invitationReceiveSchema } from './invitation-receive.schema';
import { invitationSendSchema } from './invitation-send.schema';

export const invitationSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Invitation',
    description: 'Invitation Functions',
  },
  schemas: [invitationReceiveSchema, invitationSendSchema],
};
