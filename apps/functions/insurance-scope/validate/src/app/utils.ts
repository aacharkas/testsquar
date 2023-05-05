import { ValidationNotification } from '@squaredash/shared/models';
import * as wsService from '@squaredash/websockets';
import { PostToChannelPayload, TriggerableEvent } from '@squaredash/websockets';

export async function sendNotificationToChannel(
  insuranceScopeDraftId: string,
  notification: ValidationNotification
) {
  const postToChannelPayload = getEventPayload(
    insuranceScopeDraftId,
    notification
  );
  await wsService.postToChannel(postToChannelPayload);
  return notification;
}

function getEventPayload(
  insuranceScopeDraftId: string,
  notification: ValidationNotification
): PostToChannelPayload<TriggerableEvent.INSURANCE_SCOPE_SELF_VALIDATION> {
  return {
    channel: `insurance-scope-self-validation-channel-${insuranceScopeDraftId}`,
    event: TriggerableEvent.INSURANCE_SCOPE_SELF_VALIDATION,
    data: {
      notification,
    },
  };
}

export function roundFloat(x: number, fractionDigit?: number): number {
  return Number(Number.parseFloat(x.toFixed(fractionDigit)));
}
