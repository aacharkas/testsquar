import * as accuracyCheckRunCrud from '@squaredash/crud/accuracy-check';
import * as insuranceScopeValidationRunCrud from '@squaredash/crud/insurance-scope-validation-run';
import * as wsService from '@squaredash/websockets';

export async function subscribe(connectionId: string, channelName: string) {
  await wsService.subscribe(channelName, connectionId);

  return getInitialSubscriptionData(channelName);
}

async function getInitialSubscriptionData(channelName: string) {
  if (channelName.match(/insurance-scope-self-validation-channel-/gm)) {
    const insuranceScopeDraftId = getUuidV4(channelName);
    return getInsuranceScopeValidationRun(insuranceScopeDraftId);
  }
  if (channelName.match(/insurance-scope-algorithm-validation-channel/gm)) {
    return getAlgorithmValidationRun();
  }
}

async function getInsuranceScopeValidationRun(insuranceScopeDraftId: string) {
  return insuranceScopeValidationRunCrud.findMany({
    where: { insuranceScopeDraftId: insuranceScopeDraftId },
  });
}

async function getAlgorithmValidationRun() {
  return accuracyCheckRunCrud.findFirst({
    include: {
      documents: {
        select: {
          accuracy: true,
          name: true,
        },
      },
    },
  });
}

function getUuidV4(text: string): string {
  const [id] = text.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
  );
  return id;
}
