import { useTranslation } from 'next-i18next';
import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

import Button from '../../../../libs/web/components/Button/Button';
import Checkbox from '../../../../libs/web/components/Checkbox/Checkbox';
import Input from '../../../../libs/web/components/Input/Input';
import Modal from '../../../../libs/web/components/Modal/Modal';
import PhoneInput from '../../../../libs/web/components/PhoneInput/PhoneInput';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../libs/web/constants/enums';
import { ErrorMessage } from '../Components/ErrorMessage';
import {
  GOOGLE_OPTIONS,
  LOCALISATION_INFO,
  LOCATION_FIELDS,
} from './LocationForm.constants';
import useLocationData from './hooks/useLocationData';

const Location = () => {
  const {
    localState,
    localActions,
    handlers,
    checkLocationForm,
    formattedData,
    locationForm,
    locationFormErrors,
    localErrorText,
  } = useLocationData();
  const { t } = useTranslation(['location', 'system_errors']);

  const { ref } = usePlacesWidget({
    apiKey: process.env.NX_GOOGLE_API_KEY,
    options: GOOGLE_OPTIONS,
    onPlaceSelected: (place) => {
      handlers.handleChange(place, LOCATION_FIELDS.ADDRESS);
    },
  });
  return (
    <div className="relative">
      {formattedData.loading && <Spinner contentSize />}
      <div className="p-8 bg-white rounded-lg shadow-sm min-h-[90.5vh]">
        <div className="max-w-md flex flex-col gap-6 md:m-auto">
          <Typography variant={ETextVariant.lg}>
            {formattedData?.editMode ? t('edit_location') : t('add_location')}
          </Typography>
          <Checkbox
            label={t('main_office')}
            onChange={(e) =>
              handlers.handleChange(
                e?.target?.checked,
                LOCATION_FIELDS.IS_MAIN_OFFICE
              )
            }
            checked={locationForm[LOCATION_FIELDS.IS_MAIN_OFFICE] as boolean}
            isDisabled={formattedData.isMain}
          />
          <Input
            label={t('office_name')}
            onChangeText={(e) =>
              handlers.handleChange(
                e?.target?.value,
                LOCATION_FIELDS.OFFICE_NAME
              )
            }
            value={locationForm[LOCATION_FIELDS.OFFICE_NAME] as string}
            error={!!locationFormErrors[LOCATION_FIELDS.OFFICE_NAME]}
            errorText={localErrorText(
              locationFormErrors[LOCATION_FIELDS.OFFICE_NAME] as string,
              LOCATION_FIELDS.OFFICE_NAME
            )}
            maxLength={100}
          />
          <Input
            refInput={ref}
            label={t('street_address')}
            type="text"
            onChangeText={(e) =>
              handlers.handleChange(
                e?.target?.value,
                LOCATION_FIELDS.ADDRESS_NAME
              )
            }
            value={locationForm[LOCATION_FIELDS.ADDRESS_NAME] as string}
            error={!!locationFormErrors[LOCATION_FIELDS.ADDRESS_NAME]}
            errorText={localErrorText(
              locationFormErrors[LOCATION_FIELDS.ADDRESS_NAME] as string,
              LOCATION_FIELDS.ADDRESS_NAME
            )}
            maxLength={250}
          />
          <Input
            label={t('zip_code')}
            type="text"
            className="max-w-xs"
            isDisabled
            isVisible={
              !!locationForm[LOCATION_FIELDS.ADDRESS_ZIP_CODE] ||
              !!locationFormErrors[LOCATION_FIELDS.ADDRESS_ZIP_CODE]
            }
            value={locationForm[LOCATION_FIELDS.ADDRESS_ZIP_CODE] as string}
            error={!!locationFormErrors[LOCATION_FIELDS.ADDRESS_ZIP_CODE]}
            errorText={localErrorText(
              locationFormErrors[LOCATION_FIELDS.ADDRESS_ZIP_CODE] as string,
              LOCATION_FIELDS.ADDRESS_ZIP_CODE
            )}
          />
          <Input
            label={t('state')}
            type="text"
            isDisabled
            isVisible={
              !!locationForm[LOCATION_FIELDS.ADDRESS_STATE] ||
              !!locationFormErrors[LOCATION_FIELDS.ADDRESS_STATE]
            }
            value={locationForm[LOCATION_FIELDS.ADDRESS_STATE] as string}
            error={!!locationFormErrors[LOCATION_FIELDS.ADDRESS_STATE]}
            errorText={localErrorText(
              locationFormErrors[LOCATION_FIELDS.ADDRESS_STATE] as string,
              LOCATION_FIELDS.ADDRESS_STATE
            )}
          />
          <Input
            label={t('city')}
            type="text"
            isDisabled
            isVisible={
              !!locationForm[LOCATION_FIELDS.ADDRESS_CITY] ||
              !!locationFormErrors[LOCATION_FIELDS.ADDRESS_CITY]
            }
            value={locationForm[LOCATION_FIELDS.ADDRESS_CITY] as string}
            error={!!locationFormErrors[LOCATION_FIELDS.ADDRESS_CITY]}
            errorText={localErrorText(
              locationFormErrors[LOCATION_FIELDS.ADDRESS_CITY] as string,
              LOCATION_FIELDS.ADDRESS_CITY
            )}
          />
          <Input
            label={t('contact_email')}
            type="email"
            onChangeText={(e) =>
              handlers.handleChange(e?.target?.value, LOCATION_FIELDS.EMAIL)
            }
            value={locationForm[LOCATION_FIELDS.EMAIL] as string}
            error={!!locationFormErrors[LOCATION_FIELDS.EMAIL]}
            errorText={localErrorText(
              locationFormErrors[LOCATION_FIELDS.EMAIL] as string,
              LOCATION_FIELDS.EMAIL
            )}
            maxLength={254}
          />
          <PhoneInput
            label={t('phone_number')}
            onChangeText={(val) =>
              handlers.handleChange(val, LOCATION_FIELDS.PHONE)
            }
            value={locationForm[LOCATION_FIELDS.PHONE] as string}
            error={!!locationFormErrors?.[LOCATION_FIELDS.PHONE]}
            errorText={localErrorText(
              locationFormErrors?.[LOCATION_FIELDS.PHONE]as string,
              t('phone_number')
            )}
            className="mb-8"
          />
          <ErrorMessage
            formError={locationFormErrors}
            t={t}
            options={LOCALISATION_INFO}
          />
          <div className="flex gap-3 flex-wrap-reverse mt-4">
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
            <div className="flex flex-1 gap-3">
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
                  if (!checkLocationForm())
                    handlers.handleSubmitClick(locationForm);
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
          secondButtonText={t('proceed')}
        >
          <Typography variant={ETextVariant.lg} medium>
            {localErrorText('IM0013', 'location', {name: locationForm[LOCATION_FIELDS.OFFICE_NAME]}).toUpperCase()}
          </Typography>
        </Modal>
        <Modal
          show={localState.openWarningModal}
          closeModal={() => localActions.setOpenWarningModal(false)}
          firstButtonText={t('cancel')}
        >
          <Typography variant={ETextVariant.lg} medium>
            {t('cannot_delete_main_location')}
          </Typography>
        </Modal> 
      </div>
    </div>
  );
};

export default Location;
