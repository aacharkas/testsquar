import { gql } from '@apollo/client';

import { EMAIL_TEMPLATES_API } from '../EmailTemplates.constants';
import { TEMPLATE } from './EmailTemplateForm.fragments';

export const TEMPLATE_UPSERT = gql`
  mutation TEMPLATE_UPSERT {
    templateUpsert(input:$input)
      @rest(method: "POST", type: "Template", path: "${EMAIL_TEMPLATES_API}") {
        ...TEMPLATE
    }
  }
  ${TEMPLATE}
`;

export const TEMPLATE_GET = gql`
  query TEMPLATE_GET($uuid:String!) {
    templateGet(uuid:$uuid)
      @rest(method: "GET", type: "Template", path: "${EMAIL_TEMPLATES_API}/{args.uuid}") {
        ...TEMPLATE
    }
  }
  ${TEMPLATE}
`;
