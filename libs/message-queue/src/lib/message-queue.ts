import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';

import { Config, Logger } from '@squaredash/shared/util';

const logger = new Logger('MessageQueue');
const sqs = new AWS.SQS({ region: Config.AWS.region });

export async function add<T>(topic: string, message: T): Promise<void> {
  try {
    const response = await sqs
      .sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: topic,
        MessageGroupId: 'notifications',
        MessageDeduplicationId: v4(),
      })
      .promise();
    logger.log(`Message sent: ${response.MessageId}`);
  } catch (err) {
    logger.error(`Error sending message: ${err}`);
  }
}
export async function addBatch<T>(topic: string, messages: T[]): Promise<void> {
  try {
    const response = await sqs
      .sendMessageBatch({
        Entries: messages.map((message) => ({
          Id: v4(),
          MessageBody: JSON.stringify(message),
          MessageGroupId: 'notifications',
        })),
        QueueUrl: topic,
      })
      .promise();
    logger.log(
      `Message sent: ${response.Successful.map((message) => message.MessageId)}`
    );
  } catch (err) {
    logger.error(`Error sending message: ${err}`);
  }
}
