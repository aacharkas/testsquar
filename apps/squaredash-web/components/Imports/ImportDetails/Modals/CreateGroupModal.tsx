import React from 'react';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import Textarea from '../../../../../../libs/web/components/Textarea/Textarea';
import Modal from '../../../../../../libs/web/components/Modal/Modal';
import Input from '../../../../../../libs/web/components/Input/Input';
import {TGroupForm} from '../Items/Items.types';
import {GROUP_FIELDS} from '../Items/Items.constants';

interface IProps {
  t: any,
  groupForm: TGroupForm,
  groupFormErrors: TGroupForm,
  localErrorText: (text: string, field: string) => string;
  createGroupModal: boolean,
  closeCreateGroupModal: () => void,
  handleCreateGroup: (parentId?: string) => void,
  handleChangeGroupForm: (value, name: string) => void,
  loading: boolean,
}

const CreateGroupModal = ({
  t,
  groupForm,
  groupFormErrors,
  localErrorText,
  createGroupModal,
  closeCreateGroupModal,
  handleCreateGroup,
  handleChangeGroupForm,
  loading,
}: IProps): JSX.Element => {
  const addGroup = () => {
    handleCreateGroup();
  };

  return (
    <Modal
      show={createGroupModal}
      closeModal={closeCreateGroupModal}
      secondButtonAction={addGroup}
      firstButtonText={t('cancel')}
      secondButtonText={t('create')}
      fullScreenModal
      loading={loading}
    >
      <div>
        <Typography
          variant={ETextVariant.lg}
          medium
          className="sm:text-left sm:block"
        >
          {t('add_group')}
        </Typography>
        <Input
          label={t('group_name')}
          onChangeText={(e) =>
            handleChangeGroupForm(e?.target?.value, GROUP_FIELDS.GROUP_NAME)
          }
          value={groupForm[GROUP_FIELDS.GROUP_NAME] as string}
          error={!!groupFormErrors[GROUP_FIELDS.GROUP_NAME]}
          errorText={localErrorText(
            groupFormErrors[GROUP_FIELDS.GROUP_NAME] as string,
            GROUP_FIELDS.GROUP_NAME
          )}
          maxLength={200}
          className='mt-8 mb-4'
        />
        <Textarea
          label={t('group_note')}
          rightLabel={`(${t('optional')})`}
          maxLength={500}
          onChangeText={(e) =>
            handleChangeGroupForm(e?.target?.value, GROUP_FIELDS.GROUP_NOTES)
          }
          value={groupForm[GROUP_FIELDS.GROUP_NOTES] as string}
          error={!!groupFormErrors[GROUP_FIELDS.GROUP_NOTES]}
          errorText={localErrorText(
            groupFormErrors[GROUP_FIELDS.GROUP_NOTES] as string,
            GROUP_FIELDS.GROUP_NOTES
          )}
        />
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
