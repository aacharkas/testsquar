import React, {useState} from 'react';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import Textarea from '../../../../../../libs/web/components/Textarea/Textarea';
import Modal from '../../../../../../libs/web/components/Modal/Modal';
import {IGroup, IGroupItem} from '../ImportDetails.types';
import {GROUP_FIELDS} from '../Items/Items.constants';

interface IProps {
  item: IGroup | IGroupItem,
  t: any,
  addNoteModal: boolean,
  closeModal: () => void,
  loading: boolean,
  onChange: (value, name: string, isPrice?: boolean, isDate?: boolean, groupId?: string, itemId?: string) => void,
  groupId?: string,
}

const CreateNoteModal = ({
  t,
  item,
  addNoteModal,
  closeModal,
  loading,
  onChange,
  groupId,
}: IProps): JSX.Element => {
  const [newNoteValue, setNewNoteValue] = useState<string>('');
  const addNote = () => {
    onChange(newNoteValue, GROUP_FIELDS.GROUP_NOTES, false, false, groupId || item.id, item.id);
    closeModal();
  };
  const onClose = () => {
    setNewNoteValue('');
    closeModal();
  };


  return (
    <Modal
      show={addNoteModal}
      closeModal={onClose}
      secondButtonAction={addNote}
      firstButtonText={t('cancel')}
      secondButtonText={t('add')}
      fullScreenModal
      loading={loading}
    >
      <div>
        <Typography
          variant={ETextVariant.lg}
          medium
          className="sm:text-left sm:block"
        >
          {t('add_note')}
        </Typography>
        <Textarea
          label={t('note')}
          maxLength={500}
          onChangeText={(e) => setNewNoteValue(e?.target?.value)}
          value={newNoteValue}
          className='mt-8'
        />
      </div>
    </Modal>
  );
};

export default CreateNoteModal;
