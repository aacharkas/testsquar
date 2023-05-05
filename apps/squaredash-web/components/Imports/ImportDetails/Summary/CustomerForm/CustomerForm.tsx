import React from 'react';
import {usePlacesWidget} from 'react-google-autocomplete';

import Input from '../../../../../../../libs/web/components/Input/Input';
import Modal from '../../../../../../../libs/web/components/Modal/Modal';
import PhoneInput from '../../../../../../../libs/web/components/PhoneInput/PhoneInput';
import Spinner from '../../../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../../../libs/web/components/Typography/Typography';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../../../libs/web/constants/enums';
import {
  CUSTOMER_FIELDS,
  CUSTOMER_TYPES,
  GOOGLE_OPTIONS,
} from '../../../../Customers/Customer/CustomerForm.constants';
import SelectControlled, {IItem} from '../../../../../../../libs/web/components/Select/SelectControlled';
import {ErrorMessage} from '../../../../Components/ErrorMessage';
import { TCustomerForm, TCustomerErrors } from './CustomerForm.types';
interface IProps {
  t: any;
  localState: {
    openCancelModal: boolean;
    customerForm: TCustomerForm;
    customerFormErrors: TCustomerErrors;
    loading: boolean;
  };
  handlers: {
    handleChange: (value, name: string) => void;
    handleCancelButton: () => void;
    handleCloseCancelModal: () => void;
  };
  localErrorText: (text: string, field: string) => string;
}

const CustomerForm = ({localState, t, localErrorText, handlers}:IProps) => {
  const {ref: billingRef} = usePlacesWidget({
    apiKey: process.env.NX_GOOGLE_API_KEY,
    options: GOOGLE_OPTIONS,
    onPlaceSelected: (place) => {
      handlers.handleChange(place, CUSTOMER_FIELDS.BILLING_ADDRESS);
    },
  });

  return (
    <div className="relative">
      {localState?.loading && <Spinner contentSize/>}
      <div className="pt-6 bg-white rounded-lg min-h-[90.5vh]">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray} className="sm:text-left sm:block sm:pt-1">
          {t('check_info')}
        </Typography>
        <div className="flex flex-col gap-6 md:m-auto">
          <div className="flex pt-4 justify-between xs:flex-col">
            <div className="max-w-md flex-1 mx-auto md:ml-4 sm:ml-4 xs:!ml-0 xs:mr-0">
              <SelectControlled
                className="w-1/2 mb-6"
                label={t('customer_type')}
                options={CUSTOMER_TYPES}
                value={localState?.customerForm[CUSTOMER_FIELDS.TYPE] as IItem}
                onChangeValue={(e) =>
                  handlers.handleChange(e, CUSTOMER_FIELDS.TYPE)
                }
              />
              <Input
                label={t('contact_first_name')}
                onChangeText={(e) =>
                  handlers.handleChange(
                    e?.target?.value,
                    CUSTOMER_FIELDS.FIRST_NAME
                  )
                }
                value={
                  localState?.customerForm[CUSTOMER_FIELDS.FIRST_NAME] as string
                }
                error={
                  !!localState?.customerFormErrors?.[CUSTOMER_FIELDS.FIRST_NAME]
                }
                errorText={localErrorText(
                  localState?.customerFormErrors?.[CUSTOMER_FIELDS.FIRST_NAME] as string,
                  t('contact_first_name')
                )}
                maxLength={100}
                className="mb-6"
              />
              <Input
                label={t('contact_last_name')}
                onChangeText={(e) => handlers.handleChange(
                  e?.target?.value,
                  CUSTOMER_FIELDS.LAST_NAME
                )
                }
                value={
                  localState?.customerForm[CUSTOMER_FIELDS.LAST_NAME] as string
                }
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.LAST_NAME]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.LAST_NAME] as string,
                  t('contact_last_name'))}
                maxLength={100}
                className="mb-6"
              />
              <Input
                label={t('display_name')}
                onChangeText={(e) =>
                  handlers.handleChange(e?.target?.value, CUSTOMER_FIELDS.NAME)
                }
                value={localState?.customerForm[CUSTOMER_FIELDS.NAME] as string}
                error={!!localState.customerFormErrors?.[CUSTOMER_FIELDS.NAME]}
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.NAME] as string,
                  t('display_name')
                )}
                maxLength={200}
                className="mb-6"
              />
              <Input
                label={t('contact_email')}
                type="email"
                onChangeText={(e) => handlers.handleChange(e?.target?.value, CUSTOMER_FIELDS.EMAIL)}
                value={localState?.customerForm[CUSTOMER_FIELDS.EMAIL] as string}
                error={!!localState?.customerFormErrors?.[CUSTOMER_FIELDS.EMAIL]}
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.EMAIL] as string,
                  t('contact_email')
                )}
                maxLength={254}
                className="mb-6"
              />
              <PhoneInput
                label={t('phone_number')}
                onChangeText={(val) =>
                  handlers.handleChange(val, CUSTOMER_FIELDS.PHONE)
                }
                value={localState?.customerForm[CUSTOMER_FIELDS.PHONE] as string}
                error={!!localState.customerFormErrors?.[CUSTOMER_FIELDS.PHONE]}
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.PHONE] as string,
                  t('phone_number')
                )}
                className="mb-8"
              />
            </div>
          </div>
          <div className="w-48 xs:mb-4">
            <Typography variant={ETextVariant.base} uppercase>
              {t('billing_information')}
            </Typography>
          </div>
          <div className="flex py-4 justify-between xs:flex-col">
            <div className="max-w-md flex-1 mx-auto md:ml-4 sm:ml-4 xs:!ml-0 xs:mr-0">
              <Input
                label={t('name')}
                onChangeText={(e) =>
                  handlers.handleChange(
                    e?.target?.value,
                    CUSTOMER_FIELDS.BILLING_NAME
                  )}
                value={
                  localState?.customerForm[
                    CUSTOMER_FIELDS.BILLING_NAME
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[
                    CUSTOMER_FIELDS.BILLING_NAME
                  ]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.BILLING_NAME] as string,
                  t('name')
                )}
                maxLength={200}
                className="mb-6"
              />
              <Input
                refInput={billingRef}
                label={t('street_address')}
                type="text"
                onChangeText={(e) =>
                  handlers.handleChange(
                    e?.target?.value,
                    CUSTOMER_FIELDS.BILLING_ADDRESS_NAME
                  )
                }
                value={
                  localState?.customerForm[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_NAME
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_NAME
                  ]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_NAME
                  ] as string,
                  t('street_address')
                )}
                maxLength={250}
                className="mb-8"
              />
              <Input
                label={t('zip_code')}
                type="text"
                className="max-w-xs mb-8"
                isDisabled
                isVisible={
                  !!localState.customerForm[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_ZIP_CODE
                  ] ||
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.ZIP_CODE]
                }
                value={
                  localState?.customerForm[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_ZIP_CODE
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.ZIP_CODE] &&
                  !localState.customerForm[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_ZIP_CODE
                  ]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.ZIP_CODE] as string,
                  t('zip_code')
                )}
              />
              <Input
                label={t('state')}
                type="text"
                isDisabled
                isVisible={
                  !!localState.customerForm[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_STATE
                  ] || !!localState.customerFormErrors?.[CUSTOMER_FIELDS.STATE]
                }
                value={
                  localState?.customerForm[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_STATE
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.STATE] &&
                  !localState.customerForm[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_STATE
                  ]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.STATE] as string,
                  t('state')
                )}
                className="mb-8"
              />
              <Input
                label={t('city')}
                type="text"
                isDisabled
                isVisible={
                  !!localState.customerForm?.[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_CITY
                  ] || !!localState.customerFormErrors?.[CUSTOMER_FIELDS.CITY]
                }
                value={
                  localState?.customerForm?.[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_CITY
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.CITY] &&
                  !localState.customerForm?.[
                    CUSTOMER_FIELDS.BILLING_ADDRESS_CITY
                  ]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.CITY] as string,
                  t('city')
                )}
                className="mb-8"
              />
            </div>
          </div>
          <ErrorMessage formError={localState.customerFormErrors} t={t}/>

        </div>
        <Modal
          show={localState.openCancelModal}
          closeModal={handlers.handleCloseCancelModal}
          secondButtonAction={handlers.handleCancelButton}
          firstButtonText={t('cancel')}
          secondButtonText={t('discard')}
        >
          <Typography variant={ETextVariant.lg} medium>
            {t('IM0010', {ns: 'system_errors'})}
          </Typography>
        </Modal>
      </div>
    </div>
  );
};

export default CustomerForm;
