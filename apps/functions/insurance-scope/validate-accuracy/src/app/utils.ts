import * as wsService from '@squaredash/websockets';
import { PostToChannelPayload, TriggerableEvent } from '@squaredash/websockets';

import { AccuracyNotification } from './models/accuracy-notification';

export async function sendNotificationToChannel(
  notification: AccuracyNotification
) {
  const postToChannelPayload = getEventPayload(notification);
  await wsService.postToChannel(postToChannelPayload);
  return notification;
}

function getEventPayload(
  notification: AccuracyNotification
): PostToChannelPayload<TriggerableEvent.INSURANCE_SCOPE_ALGORITHM_VALIDATION> {
  return {
    channel: `insurance-scope-algorithm-validation-channel`,
    event: TriggerableEvent.INSURANCE_SCOPE_ALGORITHM_VALIDATION,
    data: {
      notification,
    },
  };
}
