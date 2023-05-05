import {useTranslation} from 'next-i18next';
import React from 'react';
import {usePlacesWidget} from 'react-google-autocomplete';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Modal from '../../../../../libs/web/components/Modal/Modal';
import PhoneInput from '../../../../../libs/web/components/PhoneInput/PhoneInput';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {ETextVariant} from '../../../../../libs/web/constants/enums';
import {ErrorMessage} from '../../Components/ErrorMessage';
import {
  GOOGLE_OPTIONS,
  INSURANCE_CARRIER_FIELDS,
} from './InsuranceCarrierForm.constants';
import useInsuranceCarrierData from './hooks/useInsuranceCarrierData';

const Location = () => {
  const {
    localState,
    localActions,
    handlers,
    checkInsuranceCarrierForm,
    formattedData,
    localErrorText,
  } = useInsuranceCarrierData();

  const {t} = useTranslation(['insurance_carriers', 'system_errors']);

  const {ref} = usePlacesWidget({
    apiKey: process.env.NX_GOOGLE_API_KEY,
    options: GOOGLE_OPTIONS,
    onPlaceSelected: (place) => {
      handlers.handleChange(place, INSURANCE_CARRIER_FIELDS.ADDRESS);
    },
  });

  return (
    <div className="relative">
      {formattedData.loading && <Spinner contentSize/>}
      <div className="p-8 bg-white rounded-lg shadow-sm">
        <div className="max-w-md flex flex-col gap-6">
          <Typography variant={ETextVariant.lg}>
            {formattedData?.editMode
              ? t('edit_insurance_carrier')
              : t('add_insurance_carrier')}
          </Typography>
          <Input
            label={t('insurance_name')}
            onChangeText={(e) =>
              handlers.handleChange(
                e?.target?.value,
                INSURANCE_CARRIER_FIELDS.NAME
              )
            }
            value={
              localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.NAME
              ] as string
            }
            error={
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.NAME
              ]
            }
            errorText={localErrorText(
              localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.NAME
              ],
              INSURANCE_CARRIER_FIELDS.NAME
            )}
            maxLength={200}
          />
          <Input
            label={t('claims_email')}
            rightLabel={t('optional')}
            type="email"
            onChangeText={(e) =>
              handlers.handleChange(
                e?.target?.value,
                INSURANCE_CARRIER_FIELDS.EMAIL
              )
            }
            value={
              localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.EMAIL
              ] as string
            }
            error={
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.EMAIL
              ]
            }
            errorText={localErrorText(
              localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.EMAIL
              ],
              INSURANCE_CARRIER_FIELDS.EMAIL
            )}
            maxLength={254}
          />
          <PhoneInput
            label={t('phone_number')}
            rightLabel={t('optional')}
            onChangeText={(val) =>
              handlers.handleChange(val, INSURANCE_CARRIER_FIELDS.PHONE)
            }
            value={
              localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.PHONE
              ] as string
            }
            error={
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.PHONE
              ]
            }
            errorText={localErrorText(
              localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.PHONE
              ],
              INSURANCE_CARRIER_FIELDS.PHONE
            )}
            maxLength={14}
          />
          <PhoneInput
            label={t('fax_number')}
            rightLabel={t('optional')}
            onChangeText={(val) =>
              handlers.handleChange(val, INSURANCE_CARRIER_FIELDS.FAX)
            }
            value={
              localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.FAX
              ] as string
            }
            error={
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.FAX
              ]
            }
            errorText={localErrorText(
              localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.FAX
              ],
              INSURANCE_CARRIER_FIELDS.FAX
            )}
            maxLength={14}
          />
          <Input
            refInput={ref}
            label={t('street_address')}
            rightLabel={t('optional')}
            type="text"
            onChangeText={(e) =>
              handlers.handleChange(
                e?.target?.value,
                INSURANCE_CARRIER_FIELDS.ADDRESS_NAME
              )
            }
            value={
              localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.ADDRESS_NAME
              ] as string
            }
            error={
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_NAME
              ]
            }
            errorText={localErrorText(
              localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_NAME
              ],
              INSURANCE_CARRIER_FIELDS.ADDRESS_NAME
            )}
            maxLength={250}
          />
          <Input
            label={t('zip_code')}
            type="text"
            className="max-w-xs"
            isDisabled
            isVisible={
              !!localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE
              ] ||
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE
              ]
            }
            value={
              localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE
              ] as string
            }
            error={
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE
              ]
            }
            errorText={localErrorText(
              localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE
              ],
              INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE
            )}
          />
          <Input
            label={t('state')}
            type="text"
            isDisabled
            isVisible={
              !!localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.ADDRESS_STATE
              ] ||
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_STATE
              ]
            }
            value={
              localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.ADDRESS_STATE
              ] as string
            }
            error={
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_STATE
              ]
            }
            errorText={localErrorText(
              localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_STATE
              ],
              INSURANCE_CARRIER_FIELDS.ADDRESS_STATE
            )}
          />
          <Input
            label={t('city')}
            type="text"
            isDisabled
            isVisible={
              !!localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.ADDRESS_CITY
              ] ||
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_CITY
              ]
            }
            value={
              localState.insuranceCarrierForm[
                INSURANCE_CARRIER_FIELDS.ADDRESS_CITY
              ] as string
            }
            error={
              !!localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_CITY
              ]
            }
            errorText={localErrorText(
              localState.insuranceCarrierFormErrors[
                INSURANCE_CARRIER_FIELDS.ADDRESS_CITY
              ],
              INSURANCE_CARRIER_FIELDS.ADDRESS_CITY
            )}
          />
          <ErrorMessage
            formError={localState.insuranceCarrierFormErrors}
            t={t}
          />
          <div className="flex gap-3 flex-wrap-reverse mt-4">
            {formattedData.editMode && (
              <Button
                theme="outline"
                className="text-red-500 md:w-full"
                onClick={handlers.handleDeleteButton}
              >
                <Typography variant={ETextVariant.base}>
                  {t('delete')}
                </Typography>
              </Button>
            )}
            <div className="flex flex-1 gap-3">
              <Button
                theme="light"
                className="md:flex-1"
                onClick={() => localActions.setOpenCancelModal(true)}
              >
                <Typography variant={ETextVariant.base}>
                  {t('cancel')}
                </Typography>
              </Button>
              <Button
                className="md:flex-1"
                onClick={() => {
                  if (!checkInsuranceCarrierForm())
                    handlers.handleSubmitClick();
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
            {t('IM0010', {ns: 'system_errors'})}
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
            {t('delete_insurance_carrier')}
          </Typography>
        </Modal>
      </div>
    </div>
  );
};

export default Location;
