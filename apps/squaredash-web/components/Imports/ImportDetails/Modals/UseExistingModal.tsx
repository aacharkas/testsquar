import React, {useState, useEffect} from 'react';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import Modal from '../../../../../../libs/web/components/Modal/Modal';
import Input from '../../../../../../libs/web/components/Input/Input';


interface IProps {
  t: any,
  data: {
    attribute: string;
    attributeName: string;
    attributeValue: string;
  };
  hide: () => void;
  onChangeCustomer: (value, name: string) => void;
  loading: boolean;
}

const UseExistingModal = ({
  t,
  data,
  hide,
  onChangeCustomer,
  loading,
}: IProps): JSX.Element => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(data?.attributeValue);
  }, [data]);

  const onSave = () => {
    onChangeCustomer(value, data?.attribute);
    hide();
  };

  return (
    <Modal
      show={!!data}
      closeModal={hide}
      secondButtonAction={onSave}
      firstButtonText={t('cancel')}
      secondButtonText={t('save')}
      loading={loading}
    >
      <div>
        <Typography
          variant={ETextVariant.lg}
          medium
          className="sm:text-left sm:block"
        >
          {t('verify')} {data?.attributeName}
        </Typography>
        <Input
          label={data?.attributeName}
          onChangeText={(e) => setValue(e?.target?.value)}
          value={value}
          maxLength={200}
          className='mt-8 mb-4'
        />
      </div>
    </Modal>
  );
};

export default UseExistingModal;
