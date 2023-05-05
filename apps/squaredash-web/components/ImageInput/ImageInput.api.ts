import { gql } from '@apollo/client';

import { GET_UPLOAD_LINK_API } from './ImageInput.constants';
import { IMAGE_URL } from './ImageInput.fragments';

export const GET_UPLOAD_LINK = gql`
  query GET_LINK {
    get_link(extension: $extension, instance: $instance)
      @rest(method: "GET", type: "ImageUrl", path: "${GET_UPLOAD_LINK_API}{args.instance}?extension={args.extension}") {
        ...IMAGE_URL
    }
  }
  ${IMAGE_URL}
`;

export const UPLOAD_FILE = gql`
  mutation UPLOAD_FILE {
    upload_file(path: $path, payload: $payload)
      @rest(
        method: "PUT"
        type: NoResponse
        path: "{args.path}"
        bodyKey: "payload"
        endpoint: "empty"
        bodySerializer: $transform
      ) {
      NoResponse
    }
  }
`;
