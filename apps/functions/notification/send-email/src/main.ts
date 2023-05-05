import { SQSEvent } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';
import { sendMail } from '@squaredash/shared/util';

import { SendEmailBody } from './models/send-email-body';

const send = async (event: SQSEvent) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const body = (await transformAndValidate(
        SendEmailBody,
        JSON.parse(record.body)
      )) as SendEmailBody;

      await sendMail({
        recipient: body.recipient,
        template: { id: body.templateId, data: body.data },
      });
    })
  );
};

exports.handler = errorHandlerMiddleware(send);
