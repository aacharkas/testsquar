import {useTranslation} from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Modal from '../../../../../libs/web/components/Modal/Modal';
import Select from '../../../../../libs/web/components/Select/Select';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {STATUSES_LABELS} from '../../../../../libs/web/constants/constants';
import {ETextVariant} from '../../../../../libs/web/constants/enums';
import {TIME_ZONES} from '../../../constants/timezones';
import ImageInput from '../../ImageInput/ImageInput';
import {UPLOAD_INSTANCE} from '../../ImageInput/ImageInput.constants';
import {
  DEFAULT_USER_ROLES,
  MEMBER_FIELDS,
  STATUSES,
} from '../../Members/Member/MemberForm.constants';
import {ADMIN_FIELDS} from './AdminForm.constants';
import useAdminData from './hooks/useAdminData';
import SelectControlled, {IItem} from '../../../../../libs/web/components/Select/SelectControlled';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';

const AdminForm = () => {
  const {
    localState,
    localActions,
    handlers,
    checkAdminForm,
    adminFormErrors,
    adminForm,
    localErrorText,
    formattedData,
  } = useAdminData();

  const {t} = useTranslation(['admins', 'system_errors']);

  return (
    <div className="bg-white rounded-lg shadow-sm relative">
      {formattedData?.loading && <Spinner contentSize/>}
      <div className="max-w-md flex flex-col gap-6 p-8">
        <Typography variant={ETextVariant.lg}>
          {formattedData.editMode ? t('edit_admin') : t('new_admin')}
        </Typography>
        <Input
          label={t('full_name')}
          onChangeText={(e) =>
            handlers.handleChange(e?.target?.value, ADMIN_FIELDS.FULL_NAME)
          }
          value={adminForm?.[ADMIN_FIELDS.FULL_NAME] as string}
          error={!!adminFormErrors?.[ADMIN_FIELDS.FULL_NAME]}
          errorText={localErrorText(
            adminFormErrors?.[ADMIN_FIELDS.FULL_NAME],
            ADMIN_FIELDS.FULL_NAME
          )}
        />
        <Select
          label={t('status')}
          options={STATUSES}
          defaultValue={
            STATUSES_LABELS[adminForm?.[ADMIN_FIELDS.STATUS] as string]
          }
          isVisible={formattedData.editMode}
          isDisabled={true}
          onChangeValue={(e) =>
            handlers.handleChange(DEFAULT_USER_ROLES[e], ADMIN_FIELDS.STATUS)
          }
          className="max-w-[233px]"
        />
        <Input
          label={t('contact_email')}
          type="email"
          onChangeText={(e) =>
            handlers.handleChange(e?.target?.value, ADMIN_FIELDS.EMAIL)
          }
          isDisabled={formattedData.editMode}
          value={adminForm?.[ADMIN_FIELDS.EMAIL] as string}
          error={!!adminFormErrors?.[ADMIN_FIELDS.EMAIL]}
          errorText={localErrorText(
            adminFormErrors?.[ADMIN_FIELDS.EMAIL],
            ADMIN_FIELDS.EMAIL
          )}
        />
        <div>
          <Typography variant={ETextVariant.sm}>
            {t('photo')}{' '}
            <span className="text-gray-500">({t('optional')})</span>
          </Typography>
          <ImageInput
            src={adminForm?.[ADMIN_FIELDS.IMAGE_LINK] as string}
            alt={(adminForm?.[ADMIN_FIELDS.FULL_NAME] as string) || 'user-image'}
            handleUploadImage={handlers.handleUploadImages}
            instance={UPLOAD_INSTANCE.USER}
            size="small"
            shape="circle"
            isAvatar
          />
        </div>
        <SelectControlled
          label={t('timezone')}
          options={TIME_ZONES}
          value={adminForm?.[ADMIN_FIELDS.TIME_ZONE] as IItem}
          onChangeValue={(e) =>
            handlers.handleChange(e, ADMIN_FIELDS.TIME_ZONE)
          }
        />
        <div className="flex gap-3 flex-wrap-reverse">
          <Button
            hide={!formattedData.editMode || formattedData.isCurrentUser}
            theme="outline"
            className="text-red-500 md:w-full"
            onClick={handlers.handleDeleteButton}
          >
            <Typography variant={ETextVariant.base}>{t('delete')}</Typography>
          </Button>
          <div className="flex flex-1 gap-3">
            <Button
              theme="light"
              className="md:flex-1"
              onClick={() => localActions.setOpenCancelModal(true)}
            >
              <Typography variant={ETextVariant.base}>{t('cancel')}</Typography>
            </Button>
            <Button
              className="md:flex-1"
              onClick={() => {
                if (!checkAdminForm()) handlers.handleSubmitClick(adminForm);
              }}
            >
              <Typography variant={ETextVariant.base}>
                {formattedData.editMode ? t('save') : t('send_invitation')}
              </Typography>
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
          <>
            {t('delete')} {adminForm?.[MEMBER_FIELDS.FULL_NAME]}
          </>
        </Typography>
      </Modal>
    </div>
  );
};

export default AdminForm;
