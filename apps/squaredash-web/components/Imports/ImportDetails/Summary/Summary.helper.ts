import { formatDate } from '../../../../lib/formatDate';
import { formatPhoneNumber } from '../../../../lib/formatPhoneNumber';
import {
  ADJUSTERS_LABELS,
  ADJUSTERS_OPTIONS,
  IMPORT_DETAILS_FIELDS,
  IMPORT_VALIDATION_FIELDS,
} from '../ImportDetails.constants';
import {
  TImportDetailsData,
  TImportDetailsInsuranceCarrierData,
} from '../ImportDetails.types';

export const getGeneralInfoData = (data: TImportDetailsData, t: any) => {
  return [
    {
      title: t('date_of_loss'),
      value:
        (!!data[IMPORT_DETAILS_FIELDS.DATE_OF_LOSS] &&
          (formatDate(data[IMPORT_DETAILS_FIELDS.DATE_OF_LOSS]) as string)) ||
        '-',
      name: IMPORT_DETAILS_FIELDS.DATE_OF_LOSS,
      isDate: true,
      validationField: IMPORT_VALIDATION_FIELDS.DATE_OF_LOSS_FORMAT_VALIDATE, /// review
    },
    {
      title: t('type_of_loss'),
      value: (data[IMPORT_DETAILS_FIELDS.TYPE_OF_LOSS] as string) || '-',
      name: IMPORT_DETAILS_FIELDS.TYPE_OF_LOSS,
      maxLength: 50,
      validationField: IMPORT_VALIDATION_FIELDS.TYPE_OF_LOSS_VALIDATE,
    },
    {
      title: t('policy_number'),
      value: (data[IMPORT_DETAILS_FIELDS.POLICY_NUMBER] as string) || '-',
      name: IMPORT_DETAILS_FIELDS.POLICY_NUMBER,
      maxLength: 50,
      validationField: IMPORT_VALIDATION_FIELDS.POLICY_NUMBER_VALIDATE,
    },
    {
      title: t('price_list'),
      value: (data[IMPORT_DETAILS_FIELDS.PRICE_LIST] as string) || '-',
      name: IMPORT_DETAILS_FIELDS.PRICE_LIST,
      maxLength: 50,
      validationField: IMPORT_VALIDATION_FIELDS.PRICE_LIST_VALIDATE,
    },
  ];
};

export const getCustomerData = (
  data: TImportDetailsData,
  t: any,
  existingCustomer: any
) => {
  return [
    {
      title: t('contact_name'),
      value:
        (data?.[IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME] as string) || '-',
      name: IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME,
      companyId: data?.companyId,
      messageProps: {
        attribute: 'displayName',
        attributeName: t('contact_name'),
        attributeValue:
          existingCustomer?.[IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME],
      },
      isRequired: true,
    },
    {
      title: t('email'),
      value: (data?.[IMPORT_DETAILS_FIELDS.CUSTOMER_EMAIL] as string) || '-',
      name: IMPORT_DETAILS_FIELDS.CUSTOMER_EMAIL,
      maxLength: 254,
      validationField: IMPORT_VALIDATION_FIELDS.CUSTOMER_NAME_VALIDATE,
      messageProps: {
        attribute: 'email',
        attributeName: t('email'),
        attributeValue:
          existingCustomer?.[IMPORT_DETAILS_FIELDS.CUSTOMER_EMAIL],
      },
      isRequired: true,
    },
    {
      title: t('phone_number'),
      value:
        (formatPhoneNumber(
          data?.[IMPORT_DETAILS_FIELDS.CUSTOMER_PHONE]
        ) as string) || '-',
      name: IMPORT_DETAILS_FIELDS.CUSTOMER_PHONE,
      isPhone: true,
      validationField: IMPORT_VALIDATION_FIELDS.CUSTOMER_PHONE_NUMBER_VALIDATE,
      messageProps: {
        attribute: 'phone',
        attributeName: t('phone_number'),
        attributeValue:
          existingCustomer?.[IMPORT_DETAILS_FIELDS.CUSTOMER_PHONE],
      },
      isRequired: true,
    },
    {
      title: t('property_address'),
      value:
        (data?.[IMPORT_DETAILS_FIELDS.CUSTOMER_PROPERTY_ADDRESS] as string) ||
        '-',
      name: IMPORT_DETAILS_FIELDS.CUSTOMER_PROPERTY_ADDRESS,
      isAddress: true,
      validationField:
        IMPORT_VALIDATION_FIELDS.CUSTOMER_PROPERTY_ADDRESS_VALIDATE,
      isRequired: true,
    },
    {
      title: t('shipping_address'),
      value:
        (data?.[IMPORT_DETAILS_FIELDS.CUSTOMER_SHIPPING_ADDRESS] as string) ||
        '-',
      name: IMPORT_DETAILS_FIELDS.CUSTOMER_SHIPPING_ADDRESS,
      isAddress: true,
      validationField:
        IMPORT_VALIDATION_FIELDS.CUSTOMER_SHIPPING_ADDRESS_VALIDATE,
      messageProps: {
        attribute: 'shippingAddress',
        attributeName: t('shipping_address'),
        attributeValue:
          existingCustomer?.[IMPORT_DETAILS_FIELDS.CUSTOMER_SHIPPING_ADDRESS],
      },
      isRequired: true,
    },
  ];
};

export const getInsuranceCarrierData = (
  data: TImportDetailsInsuranceCarrierData,
  t: any,
  existingInsuranceCarrier: any
) => {
  return [
    {
      title: t('claims_email'),
      value:
        (data?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_EMAIL] as string) ||
        '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_EMAIL,
      maxLength: 254,
      validationField:
        IMPORT_VALIDATION_FIELDS.INSURANCE_CARRIER_EMAIL_VALIDATE,
      messageProps: {
        attribute: 'email',
        attributeName: t('claims_email'),
        attributeValue:
          existingInsuranceCarrier?.[
            IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_EMAIL
          ],
      },
    },
    {
      title: t('phone_number'),
      value:
        (formatPhoneNumber(
          data?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_PHONE]
        ) as string) || '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_PHONE,
      isPhone: true,
      validationField:
        IMPORT_VALIDATION_FIELDS.INSURANCE_CARRIER_PHONE_NUMBER_VALIDATE,
      messageProps: {
        attribute: 'phone',
        attributeName: t('phone_number'),
        attributeValue:
          existingInsuranceCarrier?.[
            IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_PHONE
          ],
      },
    },
    {
      title: t('fax_number'),
      value:
        (formatPhoneNumber(
          data?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_FAX]
        ) as string) || '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_FAX,
      isPhone: true,
      validationField: IMPORT_VALIDATION_FIELDS.INSURANCE_CARRIER_FAX_VALIDATE,
      messageProps: {
        attribute: 'fax',
        attributeName: t('fax_number'),
        attributeValue:
          existingInsuranceCarrier?.[
            IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_FAX
          ],
      },
    },
    {
      title: t('address'),
      value:
        (data?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADDRESS] as string) ||
        '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADDRESS,
      isAddress: true,
      validationField:
        IMPORT_VALIDATION_FIELDS.INSURANCE_CARRIER_ADDRESS_VALIDATE,
      messageProps: {
        attribute: 'address',
        attributeName: t('address'),
        attributeValue:
          existingInsuranceCarrier?.[
            IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADDRESS
          ],
      },
    },
  ];
};

export const getAdjusterData = (data: TImportDetailsData, t: any) => {
  return [
    {
      title: t('adjuster'),
      value:
        (data?.[
          IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_NAME
        ] as string) || '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_NAME,
      maxLength: 200,
      validationField:
        IMPORT_VALIDATION_FIELDS.INSURANCE_CARRIER_ADJUSTERS_NAME_VALIDATE,
      isRequired: true,
    },
    {
      title: t('type'),
      type: data?.[
        IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_TYPE
      ] as string,
      value:
        ADJUSTERS_LABELS[
          data?.[
            IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_TYPE
          ] as string
        ] || '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_TYPE,
      selectOptions: ADJUSTERS_OPTIONS,
      isRequired: true,
    },
    {
      title: t('contact_email'),
      value:
        (data?.[
          IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_EMAIL
        ] as string) || '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_EMAIL,
      maxLength: 254,
    },
    {
      title: t('phone_number'),
      value:
        (formatPhoneNumber(
          data?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_PHONE]
        ) as string) || '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_PHONE,
      isPhone: true,
      validationField:
        IMPORT_VALIDATION_FIELDS.INSURANCE_CARRIER_ADJUSTERS_PHONE_VALIDATE,
    },
    {
      title: t('address'),
      value:
        (data?.[
          IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_ADDRESS
        ] as string) || '-',
      name: IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_ADDRESS,
      isAddress: true,
    },
  ];
};
