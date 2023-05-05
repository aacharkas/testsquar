import { useTranslation } from 'next-i18next';
import React from 'react';

import { ErrorMessage } from '../../Components/ErrorMessage';
import Input from '../../../../../libs/web/components/Input/Input';
import { MEMBER_FIELDS } from './MemberForm.constants';
import {TMemberForm, TMemberErrors} from './MemberForm.types';

interface IProps {
  handlers: {
    handleChange: (value, name: string) => void;
  };
  memberForm: TMemberForm;
  memberFormErrors: TMemberErrors;
  localErrorText: (text: string, field: string) => string;
  setMemberForm:(value)=>void;
}
const ChangeEmailForm = ({handlers, memberForm,memberFormErrors, setMemberForm, localErrorText}:IProps) => {
  const { t } = useTranslation(['members']);

  return (
    <div className="mt-8 bg-white">
      <div className="max-w-md flex flex-col gap-6 md:m-auto">
        <Input
          label={t('new_contact_email')}
          type="email"
          onChangeText={(e) =>
            handlers.handleChange(e?.target?.value, MEMBER_FIELDS.EMAIL)
          }
          value={memberForm[MEMBER_FIELDS.EMAIL] as string}
          error={!!memberFormErrors[MEMBER_FIELDS.EMAIL]}
          errorText={localErrorText(
            memberFormErrors[MEMBER_FIELDS.EMAIL],
            MEMBER_FIELDS.EMAIL
          )}
          className="w-full"
        />
        <ErrorMessage formError={memberFormErrors} t={t} />
      </div>
    </div>
  );
};

export default ChangeEmailForm;
