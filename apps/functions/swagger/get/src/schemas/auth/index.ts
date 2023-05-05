import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { changeEmailSchema } from './change-email.schema';
import { resendConfirmationEmailSchema } from './resend-confirmation-email.schema';
import { resetPasswordReceiveSchema } from './reset-password-receive.schema';
import { resetPasswordSendSchema } from './reset-password-send.schema';
import { signInSchema } from './sign-in.schema';
import { signOutSchema } from './sign-out.schema';
import { signUpSchema } from './sign-up.schema';
import { submitChangeEmailSchema } from './submit-change-email.schema';
import { verifyEmailSchema } from './verify-email.schema';
import { verifyNewEmailSchema } from './verify-new-email.schema';

export const authSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Auth',
    description: 'Auth Functions',
  },
  schemas: [
    signInSchema,
    signOutSchema,
    signUpSchema,
    verifyEmailSchema,
    resetPasswordSendSchema,
    resetPasswordReceiveSchema,
    resendConfirmationEmailSchema,
    changeEmailSchema,
    verifyNewEmailSchema,
    submitChangeEmailSchema,
  ],
};
