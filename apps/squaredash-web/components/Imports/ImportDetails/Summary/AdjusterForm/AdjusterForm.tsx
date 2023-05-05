import React from 'react';
import {usePlacesWidget} from 'react-google-autocomplete';

import Input from '../../../../../../../libs/web/components/Input/Input';
import PhoneInput from '../../../../../../../libs/web/components/PhoneInput/PhoneInput';
import Spinner from '../../../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../../../libs/web/components/Typography/Typography';
import {
  ETextVariant,
} from '../../../../../../../libs/web/constants/enums';
import {ADJUSTER_FIELDS, GOOGLE_OPTIONS} from './AdjusterForm.constants';
import SelectControlled, {IItem} from '../../../../../../../libs/web/components/Select/SelectControlled';
import {ErrorMessage} from '../../../../Components/ErrorMessage';

import {ADJUSTERS_OPTIONS} from '../../ImportDetails.constants';
import Modal from '../../../../../../../libs/web/components/Modal/Modal';
import {TAdjusterErrors, TAdjusterForm} from './AdjusterForm.types';

interface IProps {
  t: any;
  localState: {
    openCancelModal: boolean;
  };
  handlers: {
    handleChange: (value, name: string) => void;
    handleCancelButton: () => void;
    handleCloseCancelModal: () => void;
  };
  formattedData: {
    loading: boolean;
  };
  adjusterForm: TAdjusterForm;
  adjusterFormErrors: TAdjusterErrors;
  localErrorText: (text: string, field: string) => string;
}

const AdjusterForm = ({
  t,
  localState,
  handlers,
  formattedData,
  adjusterForm,
  adjusterFormErrors,
  localErrorText
}: IProps) => {
  const {ref} = usePlacesWidget({
    apiKey: process.env.NX_GOOGLE_API_KEY,
    options: GOOGLE_OPTIONS,
    onPlaceSelected: (place) => {
      handlers.handleChange(place, ADJUSTER_FIELDS.ADDRESS);
    },
  });

  return (
    <div className="relative mt-8">
      {formattedData?.loading && <Spinner contentSize/>}
      <div>
        <Input
          label={t('adjusters_full_name')}
          onChangeText={(e) =>
            handlers.handleChange(
              e?.target?.value,
              ADJUSTER_FIELDS.NAME
            )
          }
          value={adjusterForm[ADJUSTER_FIELDS.NAME] as string}
          error={!!adjusterFormErrors[ADJUSTER_FIELDS.NAME]}
          errorText={localErrorText(
            adjusterFormErrors[ADJUSTER_FIELDS.NAME] as string,
            ADJUSTER_FIELDS.NAME
          )}
          maxLength={100}
          className="mb-8"
        />
        <SelectControlled
          label={t('type')}
          rightLabel={`(${t('optional')})`}
          options={ADJUSTERS_OPTIONS}
          value={adjusterForm[ADJUSTER_FIELDS.TYPE] as IItem}
          onChangeValue={(e) =>
            handlers.handleChange(e, ADJUSTER_FIELDS.TYPE)
          }
          error={!!adjusterFormErrors[ADJUSTER_FIELDS.TYPE]}
          errorText={localErrorText(
            adjusterFormErrors[ADJUSTER_FIELDS.TYPE],
            ADJUSTER_FIELDS.TYPE
          )}
          className="mb-8"
        />
        <Input
          label={t('contract_email')}
          rightLabel={`(${t('optional')})`}
          onChangeText={(e) =>
            handlers.handleChange(
              e?.target?.value,
              ADJUSTER_FIELDS.EMAIL
            )
          }
          value={adjusterForm[ADJUSTER_FIELDS.EMAIL] as string}
          error={!!adjusterFormErrors[ADJUSTER_FIELDS.EMAIL]}
          errorText={localErrorText(
            adjusterFormErrors[ADJUSTER_FIELDS.EMAIL] as string,
            ADJUSTER_FIELDS.EMAIL
          )}
          maxLength={254}
          className="mb-8"
        />
        <PhoneInput
          label={t('phone_number')}
          rightLabel={`(${t('optional')})`}
          onChangeText={(val) =>
            handlers.handleChange(val, ADJUSTER_FIELDS.PHONE)
          }
          value={adjusterForm[ADJUSTER_FIELDS.PHONE] as string}
          error={!!adjusterFormErrors?.[ADJUSTER_FIELDS.PHONE]}
          errorText={localErrorText(
            adjusterFormErrors?.[ADJUSTER_FIELDS.PHONE] as string,
            ADJUSTER_FIELDS.PHONE
          )}
          className="mb-8"
        />
        <Input
          refInput={ref}
          label={t('street_address')}
          rightLabel={`(${t('optional')})`}
          onChangeText={(e) =>
            handlers.handleChange(
              e?.target?.value,
              ADJUSTER_FIELDS.ADDRESS_NAME
            )
          }
          value={adjusterForm[ADJUSTER_FIELDS.ADDRESS_NAME] as string}
          error={!!adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_NAME]}
          errorText={localErrorText(
            adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_NAME] as string,
            ADJUSTER_FIELDS.ADDRESS_NAME
          )}
          maxLength={250}
          className="mb-8"
        />
        <Input
          label={t('zip_code')}
          isDisabled
          isVisible={
            !!adjusterForm[ADJUSTER_FIELDS.ADDRESS_ZIP_CODE] ||
            !!adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_ZIP_CODE]
          }
          value={adjusterForm[ADJUSTER_FIELDS.ADDRESS_ZIP_CODE] as string}
          error={!!adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_ZIP_CODE]}
          errorText={localErrorText(
            adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_ZIP_CODE] as string,
            ADJUSTER_FIELDS.ADDRESS_ZIP_CODE
          )}
          className="max-w-xs mb-8"
        />
        <Input
          label={t('state')}
          isDisabled
          isVisible={
            !!adjusterForm[ADJUSTER_FIELDS.ADDRESS_STATE] ||
            !!adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_STATE]
          }
          value={adjusterForm[ADJUSTER_FIELDS.ADDRESS_STATE] as string}
          error={!!adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_STATE]}
          errorText={localErrorText(
            adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_STATE] as string,
            ADJUSTER_FIELDS.ADDRESS_STATE
          )}
          className="mb-8"
        />
        <Input
          label={t('city')}
          isDisabled
          isVisible={
            !!adjusterForm[ADJUSTER_FIELDS.ADDRESS_CITY] ||
            !!adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_CITY]
          }
          value={adjusterForm[ADJUSTER_FIELDS.ADDRESS_CITY] as string}
          error={!!adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_CITY]}
          errorText={localErrorText(
            adjusterFormErrors[ADJUSTER_FIELDS.ADDRESS_CITY] as string,
            ADJUSTER_FIELDS.ADDRESS_CITY
          )}
          className="mb-8"
        />
        <ErrorMessage
          formError={adjusterFormErrors}
          t={t}
        />
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
  );
};

export default AdjusterForm;
