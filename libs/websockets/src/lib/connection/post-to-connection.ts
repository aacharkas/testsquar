import { AwsClient } from '@squaredash/shared/apis/aws-sdk';
import { Config, getStage } from '@squaredash/shared/util';

const endpoint = `https://${Config.AWS.gatewayDomainName}/${getStage()}`;

export async function postToConnection(connectionId: string, data: any) {
  const apiGatewayManagementApi = new AwsClient().getApiGatewayManagementApi(
    endpoint
  );

  try {
    await apiGatewayManagementApi
      .postToConnection({
        Data: JSON.stringify(data),
        ConnectionId: connectionId,
      })
      .promise();
  } catch (err) {
    console.error(
      `An error occurred while trying to post a message to connection ${connectionId}`
    );
    console.error(err);
  }
}
