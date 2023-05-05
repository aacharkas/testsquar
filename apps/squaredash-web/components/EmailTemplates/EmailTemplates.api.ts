import { gql } from '@apollo/client';

import { EMAIL_TEMPLATES_API } from './EmailTemplates.constants';
import { TEMPLATES } from './EmailTemplates.fragments';

export const GET_EMAIL_TEMPLATES = gql`
  query GET_EMAIL_TEMPLATES {
    templates @rest(method: "GET" type: "Templates" path: "${EMAIL_TEMPLATES_API}?{args}") {
      ...TEMPLATES
    }
  }
 ${TEMPLATES}
`;
