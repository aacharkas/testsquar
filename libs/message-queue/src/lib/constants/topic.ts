import * as process from 'node:process';

export const TOPIC = {
  EMAIL_NOTIFICATION: process.env['EMAIL_NOTIFICATION_TOPIC'],
  INSURANCE_SCOPE_SELF_VALIDATION:
    process.env['INSURANCE_SCOPE_SELF_VALIDATION_TOPIC'],
};
