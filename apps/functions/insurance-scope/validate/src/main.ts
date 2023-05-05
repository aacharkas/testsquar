import { APIGatewayEvent, SQSEvent, SQSRecord } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { validate } from './app/validate';
import { ValidateInsuranceScopeBody } from './models/validate-insurance-scope-body';

const lambda = async (event: SQSEvent | APIGatewayEvent) => {
  if (!isSqsEvent(event)) {
    await validate(event.pathParameters.id);

    return {
      statusCode: HTTP_STATUS.NO_CONTENT,
      headers: {
        'content-type': 'application/json',
      },
      body: null,
    };
  }

  await Promise.all(
    event.Records.map(async (record: SQSRecord): Promise<void> => {
      const body = (await transformAndValidate(
        ValidateInsuranceScopeBody,
        record.body,
        { validator: { whitelist: true } }
      )) as ValidateInsuranceScopeBody;

      await validate(body.insuranceScopeId, body.property);
    })
  );
};

function isSqsEvent(event: SQSEvent | APIGatewayEvent): event is SQSEvent {
  return (event as SQSEvent).Records !== undefined;
}

exports.handler = errorHandlerMiddleware(lambda);
