import { useTranslation } from 'next-i18next';
import React from 'react';

import Select from '../../../../../libs/web/components/Select/Select';
import Textarea from '../../../../../libs/web/components/Textarea/Textarea';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { CLAIM_ITEM_FIELDS, SOURCES } from '../ClaimItems.contants';
import { TClaimItemErrors, TClaimItemForm, TClaimItem } from '../ClaimItems.types';
import Modal from '../../../../../libs/web/components/Modal/Modal';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../../libs/web/constants/enums';

interface IProps {
  handlers: {
    handleCloseDiscardModal: () => void;
    discardModalChanges: () => void;
    handleChange: (value, name: string) => void;
  };
  claimItemForm: TClaimItemForm;
  claimItemFormErrors: TClaimItemErrors;
  localErrorText: (text: string, field: string) => string;
  localState: {
    openDiscardModal:boolean,
  },
}
const ClaimItemsForm = ({
  handlers,
  claimItemForm,
  claimItemFormErrors,
  localErrorText,
  localState,
}: IProps) => {
  const { t } = useTranslation(['claim_items', 'system_errors']);

  return (
    <div className="mt-8 bg-white">
      <div className="max-w-md flex flex-col gap-6 md:m-auto">
        <Textarea
          label={t('description')}
          name="Textarea"
          maxLength={256}
          onChangeText={(e) =>
            handlers.handleChange(
              e?.target?.value,
              CLAIM_ITEM_FIELDS.DESCRIPTION
            )
          }
          value={claimItemForm[CLAIM_ITEM_FIELDS.DESCRIPTION] as string}
          error={!!claimItemFormErrors[CLAIM_ITEM_FIELDS.DESCRIPTION]}
          errorText={localErrorText(
            claimItemFormErrors[CLAIM_ITEM_FIELDS.DESCRIPTION],
            CLAIM_ITEM_FIELDS.DESCRIPTION
          )}
        />
        <Select
          label={t('source')}
          options={SOURCES}
          placeholder="Select..."
          value={claimItemForm?.[CLAIM_ITEM_FIELDS.SOURCE] as string}
          onChangeValue={(e) =>
            handlers.handleChange(e, CLAIM_ITEM_FIELDS.SOURCE)
          }
          error={!!claimItemFormErrors?.[CLAIM_ITEM_FIELDS.SOURCE]}
          errorText={localErrorText(
            claimItemFormErrors?.[CLAIM_ITEM_FIELDS.SOURCE],
            CLAIM_ITEM_FIELDS.SOURCE
          )}
          directionClass="bottom-full"
        />
        <ErrorMessage formError={claimItemFormErrors} t={t} />
      </div>
      <Modal
        show={localState.openDiscardModal}
        closeModal={handlers.handleCloseDiscardModal}
        secondButtonAction={handlers.discardModalChanges}
        firstButtonText={t('cancel')}
        secondButtonText={t('discard')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('IM0010', { ns: 'system_errors' })}
        </Typography>
      </Modal>
    </div>
  );
};

export default ClaimItemsForm;
