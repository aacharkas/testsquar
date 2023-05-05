import sgMail from '@sendgrid/mail';
import process from 'process';

import { Config } from './config';
import { Logger } from './logger';

const logger = new Logger('Mailer');
const config = { ...Config.SENDGRID, ...Config.APP };

sgMail.setApiKey(config.apiKey as string);

export enum TemplateIds {
  verifyEmail = 'd-e2434ed6e7274ad4977eaef33dc5a819', // { name: "", confirmationUrl: "" }
  passwordChangeNotification = 'd-66ff90cdeed44b7ba830f7333622f4ed',
  invitationEmail = 'd-ee1f175d09444cd2a26d09f8cbbb3e81', // {invitationLink, companyName, role}
  superAdminInvitation = 'd-441123b2cba14f5292d044e9a2856bda', // {invitationLink, name}
  resetPassword = 'd-f97d2eb2f954453bb0013c9a3bf92a5f', // {resetUrl}
  companySuspended = 'd-26198826657c48e1bc7db9a4fbcdc9cb', // {companyName}
  companyActivated = 'd-88961777b0eb48e2bf8d113dcefb7269', // {companyName}
  changeEmail = 'd-72cb301503d74c8ba120bb12c1d5e095', // {confirmationUrl}
  emailWasChanged = 'd-b416f28248f344c49cb1d618b8a5600a',
}

interface IEmailPayload {
  recipient: string;
  template: {
    id: TemplateIds;
    data?: {
      [key: string]: string;
    };
  };
}

export async function sendMail(payload: IEmailPayload) {
  try {
    const environment = config.environment;
    const sender = await getSender(environment as string);
    const response = await sender(payload);
    logger.log(response);
  } catch (e) {
    logger.error(e);
  }
}

async function getSender(environment: string) {
  switch (environment) {
    case 'production':
      return sendSg;
    case 'development':
    case 'qa':
    case 'uat':
      return sendSgToTestAccount;
    default:
      return sendMock;
  }
}

async function sendSg(payload: IEmailPayload) {
  return sgMail.send({
    to: payload.recipient,
    from: { email: 'no-reply@squaredash.com', name: 'Squaredash' },
    templateId: payload.template.id,
    dynamicTemplateData: payload.template.data ?? {},
  });
}

async function sendSgToTestAccount(payload: IEmailPayload) {
  return sgMail.send({
    to: payload.recipient.includes('+')
      ? payload.recipient
      : process.env.TESTING_RECIPIENT_EMAIL,
    from: { email: 'no-reply@squaredash.com', name: 'Squaredash' },
    templateId: payload.template.id,
    dynamicTemplateData: payload.template.data ?? {},
  });
}

async function sendMock(payload: IEmailPayload) {
  logger.log(`Mocked email sending to ${payload.recipient}`);
  logger.dir(payload.template, 'log');
}
