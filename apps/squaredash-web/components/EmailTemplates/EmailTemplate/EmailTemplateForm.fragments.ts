import { gql } from '@apollo/client';

export const CUSTOM_TEMPLATE = gql`
  fragment CUSTOM_TEMPLATE on CustomTemplate {
    id
    companyId
    customSubject
    customBody
    customButtonText
    createdAt
    updatedAt
    createdBy
    updatedBy
    techStatus
    emailTemplateId
  }
`;

export const TEMPLATE = gql`
  fragment TEMPLATE on Template {
    id
    name
    defaultSubject
    defaultBody
    defaultButtonText
    companyEmailTemplate @type(name: "CustomTemplate") {
      ...CUSTOM_TEMPLATE
    }
    createdAt
    techStatus
    templateId
    updatedAt
    customFields
    html
  }
  ${CUSTOM_TEMPLATE}
`;
