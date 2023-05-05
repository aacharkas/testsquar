import { Matches } from 'class-validator';

const EMAIL_REGEX =
  /^([\w-]+(?:\.[\w-]+)*\+?[\w-]*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export const IsValidEmail = () =>
  Matches(EMAIL_REGEX, {
    message: 'email must be valid',
  });
