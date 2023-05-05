import { useTranslation } from 'next-i18next';
import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import classNames from 'classnames';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import { useInputMask } from '../../../../../libs/web/components/Input/Input.helper';
import Modal from '../../../../../libs/web/components/Modal/Modal';
import PhoneInput from '../../../../../libs/web/components/PhoneInput/PhoneInput';
import Select from '../../../../../libs/web/components/Select/Select';
import SelectControlled, {
  IItem,
} from '../../../../../libs/web/components/Select/SelectControlled';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../../libs/web/constants/enums';
import { TIME_ZONES } from '../../../constants/timezones';
import { ErrorMessage } from '../../Components/ErrorMessage';
import ImageInput from '../../ImageInput/ImageInput';
import { UPLOAD_INSTANCE } from '../../ImageInput/ImageInput.constants';
import {
  GOOGLE_OPTIONS,
  MEMBER_FIELDS,
  SIZES,
  SIZE_FIELDS,
  STATUSES,
} from './MemberForm.constants';
import useMemberData from './hooks/useMemberData';
import ChangeEmailForm from '../Member/ChangeEmailForm';
import Message from '../../../../../libs/web/components/Message/Message';

const MemberForm = () => {
  const {
    localState,
    localActions,
    handlers,
    checkMemberForm,
    memberFormErrors,
    memberForm,
    localErrorText,
    formattedData,
  } = useMemberData();

  const { t } = useTranslation(['members', 'system_errors']);
  const { ref: numberRef, onKeyUp: onKeyUpNumber } = useInputMask('01/01');

  const { ref } = usePlacesWidget({
    apiKey: process.env.NX_GOOGLE_API_KEY,
    options: GOOGLE_OPTIONS,
    onPlaceSelected: (place) => {
      handlers.handleChange(place, MEMBER_FIELDS.ADDRESS);
    },
  });

  return (
    <div className="relative">
      {formattedData.loading && <Spinner contentSize />}
      <div className="p-8 bg-white rounded-lg shadow-sm sm:p-3">
        <div className="max-w-md flex flex-col gap-6 md:m-auto">
          <Typography variant={ETextVariant.lg}>
            {formattedData?.pageTitle}
          </Typography>
          <Input
            label={t('full_name')}
            onChangeText={(e) =>
              handlers.handleChange(e?.target?.value, MEMBER_FIELDS.FULL_NAME)
            }
            value={memberForm[MEMBER_FIELDS.FULL_NAME] as string}
            error={!!memberFormErrors[MEMBER_FIELDS.FULL_NAME]}
            errorText={localErrorText(
              memberFormErrors[MEMBER_FIELDS.FULL_NAME],
              MEMBER_FIELDS.FULL_NAME
            )}
            maxLength={50}
          />
          <SelectControlled
            label={t('status')}
            options={STATUSES}
            value={memberForm[MEMBER_FIELDS.STATUS] as IItem}
            isVisible={formattedData.editMode}
            // isDisabled={!formattedData.isAbleToSuspend || formattedData.isCurrentUser}
            isDisabled
            onChangeValue={(e) =>
              handlers.handleChange(e, MEMBER_FIELDS.STATUS)
            }
            className="max-w-[233px]"
          />
          <SelectControlled
            label={t('role')}
            isDisabled={formattedData.isCurrentUser}
            options={formattedData.rolesList}
            value={memberForm[MEMBER_FIELDS.ROLE] as IItem}
            isVisible={!!formattedData?.rolesList?.length && !formattedData.isCurrentUser}
            onChangeValue={(e) => handlers.handleChange(e, MEMBER_FIELDS.ROLE)}
            className="max-w-[233px]"
          />
          <div className="flex items-center relative sm:block">
            <div className='w-full'>
              <Input
                label={t('contact_email')}
                type="email"
                onChangeText={(e) =>
                  handlers.handleChange(e?.target?.value, MEMBER_FIELDS.EMAIL)
                }
                value={formattedData.editMode ? formattedData.emailValue : memberForm[MEMBER_FIELDS.EMAIL] as string}
                isDisabled={formattedData.editMode}
                error={!formattedData.editMode && !!memberFormErrors[MEMBER_FIELDS.EMAIL]}
                errorText={!formattedData.editMode && localErrorText(
                  memberFormErrors[MEMBER_FIELDS.EMAIL],
                  MEMBER_FIELDS.EMAIL
                )}
                className="w-full"
              />
              {(!!localState.showNotification || formattedData.isEmailChangeLinkValid) && <div className='flex mt-2'>
                <ExclamationTriangleIcon className="h-4 w-4 text-slate-500 mr-2" aria-hidden="true" />
                <Typography variant={ETextVariant.xs} color={ETextColor.gray}>{t('contact_email_alert',{ email : localState.showNotification ? memberForm[MEMBER_FIELDS.EMAIL] : formattedData?.updatedEmail})}</Typography>
              </div>}
            </div>
            <Typography
              variant={ETextVariant.xs}
              color={ETextColor.primary}
              medium
              className={classNames(
                ( !formattedData.editMode || !formattedData?.canChangeEmail || formattedData?.isCurrentUser ) && 'hidden',
                'right-[-58px] top-9 absolute sm:static sm:mt-4 cursor-pointer'
              )}
              onClick={() => localActions.setOpenEmailModal(true)}
            >
              {t('change')}
            </Typography>
            <Typography
              variant={ETextVariant.xs}
              color={ETextColor.primary}
              medium
              className={classNames(
                ( !formattedData.isEmailChangeLinkValid || !formattedData.editMode || !formattedData?.canChangeEmail || formattedData?.isCurrentUser ) && 'hidden',
                'right-[-162px] top-9 absolute sm:static sm:mt-4 cursor-pointer'
              )}
              onClick={() => handlers.resendEmail()}
            >
              {t('resend_email')}
            </Typography>
          </div>
          <PhoneInput
            label={t('phone_number')}
            onChangeText={(val) =>
              handlers.handleChange(val, MEMBER_FIELDS.PHONE)
            }
            value={memberForm[MEMBER_FIELDS.PHONE] as string}
            error={!!memberFormErrors[MEMBER_FIELDS.PHONE]}
            errorText={localErrorText(
              memberFormErrors[MEMBER_FIELDS.PHONE],
              MEMBER_FIELDS.PHONE
            )}
            rightLabel={`(${t('optional')})`}
          />
          <Input
            refInput={ref}
            label={t('street_address')}
            type="text"
            onChangeText={(e) =>
              handlers.handleChange(
                e?.target?.value,
                MEMBER_FIELDS.ADDRESS_NAME
              )
            }
            value={memberForm[MEMBER_FIELDS.ADDRESS_NAME] as string}
            error={!!memberFormErrors[MEMBER_FIELDS.ADDRESS_NAME]}
            errorText={localErrorText(
              memberFormErrors[MEMBER_FIELDS.ADDRESS_NAME],
              MEMBER_FIELDS.ADDRESS_NAME
            )}
            maxLength={250}
            rightLabel={`(${t('optional')})`}
          />
          <Input
            label={t('zip_code')}
            type="text"
            className="max-w-[233px]"
            isDisabled
            isVisible={
              !!memberForm[MEMBER_FIELDS.ADDRESS_ZIP_CODE] ||
              !!memberFormErrors[MEMBER_FIELDS.ADDRESS_ZIP_CODE]
            }
            value={memberForm[MEMBER_FIELDS.ADDRESS_ZIP_CODE] as string}
            error={!!memberFormErrors[MEMBER_FIELDS.ADDRESS_ZIP_CODE]}
            errorText={localErrorText(
              memberFormErrors[MEMBER_FIELDS.ADDRESS_ZIP_CODE],
              MEMBER_FIELDS.ADDRESS_ZIP_CODE
            )}
          />
          <Input
            label={t('state')}
            type="text"
            isDisabled
            isVisible={
              !!memberForm[MEMBER_FIELDS.ADDRESS_STATE] ||
              !!memberFormErrors[MEMBER_FIELDS.ADDRESS_STATE]
            }
            value={memberForm[MEMBER_FIELDS.ADDRESS_STATE] as string}
            error={!!memberFormErrors[MEMBER_FIELDS.ADDRESS_STATE]}
            errorText={localErrorText(
              memberFormErrors[MEMBER_FIELDS.ADDRESS_STATE],
              MEMBER_FIELDS.ADDRESS_STATE
            )}
          />
          <Input
            label={t('city')}
            type="text"
            isDisabled
            isVisible={
              !!memberForm[MEMBER_FIELDS.ADDRESS_CITY] ||
              !!memberFormErrors[MEMBER_FIELDS.ADDRESS_CITY]
            }
            value={memberForm[MEMBER_FIELDS.ADDRESS_CITY] as string}
            error={!!memberFormErrors[MEMBER_FIELDS.ADDRESS_CITY]}
            errorText={localErrorText(
              memberFormErrors[MEMBER_FIELDS.ADDRESS_CITY],
              MEMBER_FIELDS.ADDRESS_CITY
            )}
          />
          <SelectControlled
            label={t('timezone')}
            options={TIME_ZONES}
            value={memberForm[MEMBER_FIELDS.TIME_ZONE] as IItem}
            onChangeValue={(e) =>
              handlers.handleChange(e, MEMBER_FIELDS.TIME_ZONE)
            }
          />
          <div>
            <Typography variant={ETextVariant.sm}>
              {t('photo')}{' '}
              <span className="text-gray-500">({t('optional')})</span>
            </Typography>
            <ImageInput
              src={memberForm[MEMBER_FIELDS.IMAGE_LINK] as string}
              alt={
                (memberForm[MEMBER_FIELDS.FULL_NAME] as string) || 'user-image'
              }
              handleUploadImage={handlers.handleUploadImages}
              instance={UPLOAD_INSTANCE.USER}
              size="small"
              shape="circle"
              isAvatar
            />
          </div>
          <Input
            label={t('date_of_birth')}
            type="text"
            refInput={numberRef}
            onKeyUp={onKeyUpNumber}
            onChangeText={(e) =>
              handlers.handleChange(
                e?.target?.value,
                MEMBER_FIELDS.DATE_OF_BIRTH
              )
            }
            value={memberForm[MEMBER_FIELDS.DATE_OF_BIRTH] as string}
            error={!!memberFormErrors[MEMBER_FIELDS.DATE_OF_BIRTH]}
            errorText={localErrorText(
              memberFormErrors[MEMBER_FIELDS.DATE_OF_BIRTH],
              MEMBER_FIELDS.DATE_OF_BIRTH
            )}
            rightLabel={`(${t('optional')})`}
            className="max-w-[233px]"
          />
          <Select
            label={t('t_shirt_size')}
            options={SIZES}
            value={memberForm[MEMBER_FIELDS.T_SHIRT_SIZE] as string}
            onChangeValue={(e) =>
              handlers.handleChange(SIZE_FIELDS[e], MEMBER_FIELDS.T_SHIRT_SIZE)
            }
            className="max-w-[233px]"
            directionClass="md:bottom-full sm:bottom-full"
          />
          <ErrorMessage formError={memberFormErrors} t={t} />
          <div className="flex gap-3 flex-wrap-reverse">
            {formattedData.editMode && !formattedData.isCurrentUser && (
              <Button
                theme="outline"
                className="text-red-500 md:w-ful sm:w-full"
                onClick={handlers.handleDeleteButton}
              >
                <Typography variant={ETextVariant.base}>
                  {t('delete')}
                </Typography>
              </Button>
            )}
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
                  if (!checkMemberForm())
                    handlers.handleSubmitClick(memberForm);
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
            {localErrorText('IM0013', 'member', {name: memberForm[MEMBER_FIELDS.FULL_NAME]})}
          </Typography>
        </Modal>
        <Modal
          show={localState.openEmailModal}
          closeModal={() => localActions.setOpenCancelModal(true)}
          secondButtonAction={handlers.handleEmailChange}
          firstButtonText={t('cancel')}
          secondButtonText={t('save_changes')}
          fullScreenModal
        >
          <div>
            <Typography
              variant={ETextVariant.lg}
              medium
              className="sm:text-left sm:block"
            >
              {t('change_member_email')}
            </Typography>
            <ChangeEmailForm 
              handlers={handlers}
              memberForm={memberForm} 
              memberFormErrors={memberFormErrors} 
              setMemberForm={localActions.setMemberForm}
              localErrorText={localErrorText}/>
          </div>
        </Modal>
        <Message
          show={!!localState.openMessage}
          closeMessage={() => localActions.setOpenMessage(false)}
        >
          <Typography variant={ETextVariant.sm} className='mb-1 pr-7'>
            {t('edit_email_success_title', { name: memberForm[MEMBER_FIELDS.FULL_NAME]})}
          </Typography>
          <Typography variant={ETextVariant.sm} medium color={ETextColor.gray} className='pr-4'>
            {t('edit_email_success_message', { name: memberForm[MEMBER_FIELDS.FULL_NAME]})}
          </Typography>
        </Message>
      </div>
    </div>
  );
};

export default MemberForm;
