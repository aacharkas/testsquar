import { DocumentDuplicateIcon, PlusIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

import Button from '../../../../../libs/web/components/Button/Button';
import Checkbox from '../../../../../libs/web/components/Checkbox/Checkbox';
import Input from '../../../../../libs/web/components/Input/Input';
import Modal from '../../../../../libs/web/components/Modal/Modal';
import PhoneInput from '../../../../../libs/web/components/PhoneInput/PhoneInput';
import {
  AsyncSelect,
} from '../../../../../libs/web/components/Select/AsyncSelect';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Textarea from '../../../../../libs/web/components/Textarea/Textarea';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import { ROLES } from '../../../constants/roles';
import { USER_STATUSES } from '../../../constants/userStatuses';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { GET_MEMBERS } from '../../Members/Members.api';
import { GET_CUSTOMERS } from '../Customers.api';
import {
  CUSTOMER_FIELDS,
  CUSTOMER_TYPES,
  GOOGLE_OPTIONS,
} from './CustomerForm.constants';
import { TRelatedUser } from './CustomerForm.types';
import useCustomerData from './hooks/useCustomerData';
import SelectControlled, { IItem } from '../../../../../libs/web/components/Select/SelectControlled';
import {Can} from '../../../lib/ability';
import {PERMISSION_ACTIONS, PERMISSIONS} from '../../../constants/permissions';

const Customer = () => {
  const {
    localState,
    localActions,
    handlers,
    checkCustomerForm,
    formattedData,
    localErrorText,
  } = useCustomerData();

  const { t } = useTranslation(['customers', 'system_errors']);

  const { ref: billingRef } = usePlacesWidget({
    apiKey: process.env.NX_GOOGLE_API_KEY,
    options: GOOGLE_OPTIONS,
    onPlaceSelected: (place) => {
      handlers.handleChange(place, CUSTOMER_FIELDS.BILLING_ADDRESS);
    },
  });

  const { ref: shippingRef } = usePlacesWidget({
    apiKey: process.env.NX_GOOGLE_API_KEY,
    options: GOOGLE_OPTIONS,
    onPlaceSelected: (place) => {
      handlers.handleChange(place, CUSTOMER_FIELDS.SHIPPING_ADDRESS);
    },
  });
  return (
    <div className="relative">
      {formattedData.loading && <Spinner contentSize />}
      <div className="p-6 bg-white rounded-lg shadow-sm min-h-[90.5vh]">
        <div className="flex flex-col gap-6 md:m-auto">
          <Typography variant={ETextVariant.lg}>
            {formattedData?.editMode ? t('edit_customer') : t('new_customer')}
          </Typography>
          <div className="flex py-4 border-b border-gray-900/20 justify-between xs:flex-col">
            <div className="w-48 xs:mb-4">
              <Typography variant={ETextVariant.base}>
                {t('general')}
              </Typography>
            </div>
            <div className="max-w-md flex-1 mx-auto ml-48 md:ml-4 sm:ml-4 xs:!ml-0 xs:mr-0">
              <SelectControlled
                className="w-1/2 mb-6"
                label={t('customer_type')}
                options={CUSTOMER_TYPES}
                value={localState.customerForm[CUSTOMER_FIELDS.TYPE] as IItem}
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
                  localState.customerForm[CUSTOMER_FIELDS.FIRST_NAME] as string
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
                onChangeText={(e) =>
                  handlers.handleChange(
                    e?.target?.value,
                    CUSTOMER_FIELDS.LAST_NAME
                  )
                }
                value={
                  localState.customerForm[CUSTOMER_FIELDS.LAST_NAME] as string
                }
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.LAST_NAME]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.LAST_NAME] as string,
                  t('contact_last_name')
                )}
                maxLength={100}
                className="mb-6"
              />
              <Input
                label={t('display_name')}
                onChangeText={(e) =>
                  handlers.handleChange(e?.target?.value, CUSTOMER_FIELDS.NAME)
                }
                value={localState.customerForm[CUSTOMER_FIELDS.NAME] as string}
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
                onChangeText={(e) =>
                  handlers.handleChange(e?.target?.value, CUSTOMER_FIELDS.EMAIL)
                }
                value={localState.customerForm[CUSTOMER_FIELDS.EMAIL] as string}
                error={!!localState.customerFormErrors?.[CUSTOMER_FIELDS.EMAIL]}
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
                value={localState.customerForm[CUSTOMER_FIELDS.PHONE] as string}
                error={!!localState.customerFormErrors?.[CUSTOMER_FIELDS.PHONE]}
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.PHONE] as string,
                  t('phone_number')
                )}
                className="mb-8"
              />
            </div>
          </div>
          <div className="flex py-4 border-b border-gray-900/20 justify-between xs:flex-col">
            <div className="w-48 xs:mb-4">
              <Typography variant={ETextVariant.base}>
                {t('billing_information')}
              </Typography>
            </div>
            <div className="max-w-md flex-1 mx-auto ml-48 md:ml-4 sm:ml-4 xs:!ml-0 xs:mr-0">
              <Input
                label={t('name')}
                onChangeText={(e) =>
                  handlers.handleChange(
                    e?.target?.value,
                    CUSTOMER_FIELDS.BILLING_NAME
                  )
                }
                value={
                  localState.customerForm[
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
                  localState.customerForm[
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
                  localState.customerForm[
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
                  localState.customerForm[
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
                  localState.customerForm?.[
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
          <div className="flex py-4 border-b border-gray-900/20 justify-between xs:flex-col">
            <div className="flex flex-col w-48 xs:mb-4">
              <Typography
                variant={ETextVariant.base}
                className="mb-4"
              >
                {t('shipping_information')}
              </Typography>
              <Button
                theme="light"
                size="big"
                className="max-h-[40px] min-w-[200px]"
                onClick={handlers.handleCopyShippingAddressFromBilling}
              >
                <DocumentDuplicateIcon className="h-5 w-5 text-gray-800" />
                <Typography
                  variant={ETextVariant.base}
                  className="text-gray-800 ml-2"
                >
                  {t('copy_from_billing')}
                </Typography>
              </Button>
            </div>
            <div className="max-w-md flex-1 mx-auto ml-48 md:ml-4 sm:ml-4 xs:!ml-0 xs:mr-0">
              <Input
                label={t('name')}
                onChangeText={(e) =>
                  handlers.handleChange(
                    e?.target?.value,
                    CUSTOMER_FIELDS.SHIPPING_NAME
                  )
                }
                value={
                  localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_NAME
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[
                    CUSTOMER_FIELDS.SHIPPING_NAME
                  ]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[
                    CUSTOMER_FIELDS.SHIPPING_NAME
                  ]as string,
                  t('name')
                )}
                maxLength={200}
                className="mb-6"
              />
              <Input
                refInput={shippingRef}
                label={t('street_address')}
                type="text"
                onChangeText={(e) =>
                  handlers.handleChange(
                    e?.target?.value,
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME
                  )
                }
                value={
                  localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME
                  ]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME
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
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_ZIP_CODE
                  ] ||
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.ZIP_CODE]
                }
                value={
                  localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_ZIP_CODE
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.ZIP_CODE] &&
                  !localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_ZIP_CODE
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
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_STATE
                  ] || !!localState.customerFormErrors?.[CUSTOMER_FIELDS.STATE]
                }
                value={
                  localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_STATE
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.STATE] &&
                  !localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_STATE
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
                  !!localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_CITY
                  ] || !!localState.customerFormErrors?.[CUSTOMER_FIELDS.CITY]
                }
                value={
                  localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_CITY
                  ] as string
                }
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.CITY] &&
                  !localState.customerForm[
                    CUSTOMER_FIELDS.SHIPPING_ADDRESS_CITY
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
          <div className="flex py-4 border-b border-gray-900/20 justify-between xs:flex-col">
            <div className="w-48 xs:mb-4">
              <Checkbox
                label={t('sub_customer')}
                onChange={(e) =>
                  handlers.handleChange(
                    e?.target?.checked,
                    CUSTOMER_FIELDS.IS_SUB_CUSTOMERS
                  )
                }
                checked={
                  localState.customerForm[
                    CUSTOMER_FIELDS.IS_SUB_CUSTOMERS
                  ] as boolean
                }
              />
            </div>
            <div className="max-w-md flex-1 mx-auto ml-48 md:ml-4 sm:ml-4 xs:!ml-0 xs:mr-0 relative">
              <AsyncSelect
                className="mb-8"
                label={t('parent_customer')}
                variableName="search"
                responsePathToArray="customers"
                queryStructure={GET_CUSTOMERS}
                initialLoad
                isDisabled={
                  !localState.customerForm[
                    CUSTOMER_FIELDS.IS_SUB_CUSTOMERS
                  ] as boolean
                }
                value={
                  localState.customerForm[
                    CUSTOMER_FIELDS.PARENT
                  ] as unknown as IItem
                }
                onChange={(e) =>
                  handlers.handleChange(e, CUSTOMER_FIELDS.PARENT)
                }
                removeIds={[formattedData.customerId as string]}
                error={
                  !!localState.customerFormErrors?.[CUSTOMER_FIELDS.PARENT]
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.PARENT] as string,
                  t('parent')
                )}
                numberRequestElements={10}
                responseNameName={'displayName'}
                requestOptions={{
                  category: 'PARENT',
                  companyId: formattedData.companyId,
                }}
              />
            </div>
          </div>
          <div className="flex py-4 border-b border-gray-900/20 justify-between pr-20 xs:flex-col xs:pr-0">
            <div className="w-48 xs:mb-4">
              <Typography variant={ETextVariant.base}>
                {t('responsible_member')}
              </Typography>
            </div>
            <div className="max-w-md flex-1 mx-auto ml-48 md:ml-4 sm:ml-4 xs:!ml-0 xs:mr-0">
              {(
                localState.customerForm[
                  CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
                ] as TRelatedUser[]
              ).map((item, index) => (
                <div className="relative" key={`${item?.id}-${index}`}>
                  <AsyncSelect
                    label={t('member')}
                    variableName="search"
                    responsePathToArray="members"
                    queryStructure={GET_MEMBERS}
                    isDisabled={formattedData.notAbleToChangeMember}
                    numberRequestElements={10}
                    initialLoad={!formattedData.notAbleToChangeMember}
                    removeIds={(
                      localState.customerForm[
                        CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
                      ] as TRelatedUser[]
                    ).map((member) => member?.id)}
                    className={classNames('mb-4', {
                      'md:mb-0 sm:mb-0': !!index,
                    })}
                    value={item as unknown as IItem}
                    onChange={(e) => handlers.handleChangeMember(e, item)}
                    error={
                      !!localState.customerFormErrors?.[
                        CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
                      ]
                    }
                    errorText={localErrorText(
                      localState.customerFormErrors?.[
                        CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
                      ]as string,
                      t('member')
                    )}
                    requestOptions={{
                      roles: formattedData?.isAddCurrentUser?[ROLES.COMPANY_USER, formattedData?.currentRole]:[ROLES.COMPANY_USER],
                      statuses: USER_STATUSES.ACTIVE,
                    }}
                  />
                  <Button
                    theme="outline"
                    hide={formattedData.notAbleToChangeMember}
                    disabled={formattedData.notAbleToChangeMember}
                    className="absolute right-[-70px] top-8 md:static sm:static md:mb-4 sm:mb-4 md:pl-0 sm:pl-0"
                    onClick={() => handlers.handleRemoveMember(item)}
                  >
                    <Typography
                      variant={ETextVariant.sm}
                      color={ETextColor.primary}
                      medium
                    >
                      {t('delete')}
                    </Typography>
                  </Button>
                </div>
              ))}
              {!!localState.customerFormErrors?.[
                CUSTOMER_FIELDS.RESPONSIBLE_MEMBER_IDS
              ] &&
                      localState.customerFormErrors?.[
                        CUSTOMER_FIELDS.RESPONSIBLE_MEMBER_IDS
                      ] && (
                <p className="mt-2 text-sm text-red-600">{localErrorText(
                  localState.customerFormErrors?.[
                    CUSTOMER_FIELDS.RESPONSIBLE_MEMBER_IDS
                  ] as string,
                  t('member')
                )}</p>
              )}
              <Button
                theme="light"
                size="big"
                hide={formattedData.notAbleToChangeMember}
                disabled={formattedData.notAbleToChangeMember}
                onClick={handlers.handleAddMember}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                <Typography variant={ETextVariant.base}>
                  {t('add_member')}
                </Typography>
              </Button>
            </div>
          </div>
          <div className="flex py-4 justify-between xs:flex-col">
            <div className="w-48 xs:mb-4">
              <Typography variant={ETextVariant.base}>
                {t('notes')}
              </Typography>
            </div>
            <div className="max-w-md flex-1 mx-auto ml-48 md:ml-4 sm:ml-4 xs:!ml-0 xs:mr-0">
              <Textarea
                label={t('')}
                rightLabel={`(${t('optional')})`}
                value={localState.customerForm[CUSTOMER_FIELDS.NOTES] as string}
                error={!!localState.customerFormErrors?.[CUSTOMER_FIELDS.NOTES]}
                maxLength={4000}
                onChangeText={(e) =>
                  handlers.handleChange(e?.target?.value, CUSTOMER_FIELDS.NOTES)
                }
                errorText={localErrorText(
                  localState.customerFormErrors?.[CUSTOMER_FIELDS.NOTES] as string,
                  t('state')
                )}
                className="mb-8"
              />
            </div>
          </div>
          <ErrorMessage formError={localState.customerFormErrors} t={t} />
          <div className="flex gap-3 flex-wrap-reverse">
            <Can I={PERMISSION_ACTIONS.DELETE} a={PERMISSIONS.CUSTOMER}>
              {formattedData.editMode && (
                <Button
                  theme="outline"
                  className="text-red-500 md:w-full sm:w-full"
                  onClick={handlers.handleDeleteButton}
                >
                  <Typography variant={ETextVariant.base}>
                    {t('delete')}
                  </Typography>
                </Button>
              )}
            </Can>
            <div className="flex flex-1 gap-3 sm:max-h-[40px]">
              <Button
                theme="light"
                className="md:flex-1 sm:flex-1"
                onClick={() => localActions.setOpenCancelModal(true)}
              >
                <Typography variant={ETextVariant.base}>
                  {t('cancel')}
                </Typography>
              </Button>
              <Button
                className="md:flex-1 sm:flex-1"
                onClick={() => {
                  if (!checkCustomerForm()) handlers.handleSubmitClick();
                }}
              >
                <Typography variant={ETextVariant.base}>{t('save')}</Typography>
              </Button>
            </div>
          </div>
        </div>
        <Modal
          show={localState.openCancelModal}
          closeModal={handlers.handleCloseCancelModal}
          secondButtonAction={handlers.handleCancelButton}
          firstButtonText={t('cancel')}
          secondButtonText={t('discard')}
        >
          <Typography variant={ETextVariant.lg} medium>
            {t('IM0010', { ns: 'system_errors' })}
          </Typography>
        </Modal>
        <Modal
          show={localState.openDeleteModal}
          closeModal={() => localActions.setOpenDeleteModal(false)}
          secondButtonAction={handlers.handleInactivate}
          firstButtonText={t('cancel')}
          secondButtonText={t('delete')}
        >
          <Typography variant={ETextVariant.lg} medium>
            {t('delete_customer')}
          </Typography>
        </Modal>
      </div>
    </div>
  );
};

export default Customer;
