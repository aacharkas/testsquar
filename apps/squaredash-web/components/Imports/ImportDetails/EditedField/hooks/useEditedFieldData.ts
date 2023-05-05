import { useEffect, useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

import { IItem } from '../../../../../../../libs/web/components/Select/SelectControlled';
import { formatDate } from '../../../../../lib/formatDate';
import { DEFAULT_EDITED_FIELD } from '../../ImportDetails.constants';
import { GOOGLE_OPTIONS } from '../../ImportDetails.helper';
import { TEditedField } from '../../ImportDetails.types';
import { VALUES_TO_EXCLUDE } from '../../Items/Items.constants';

interface Item {
  title?: string;
  type?: string;
  value: string | number | boolean;
  name: string;
  selectOptions?: IItem[];
  isRequired?: boolean;
  isPrice?: boolean;
}

interface IProps {
  item: Item;
  selectedItem: IItem;
  secondItem: Item;
  checkItem: Item;
  setEditItem: (value: TEditedField) => void;
  onChange: (
    value,
    name: string,
    isPrice?: boolean,
    isDate?: boolean,
    id?: string,
    uuid?: string
  ) => void;
  id: string;
  groupId: string;
  isPrice: boolean;
  isDate: boolean;
  isSelect?: boolean;
}

const useEditedFieldData = ({
  item,
  selectedItem,
  secondItem,
  checkItem,
  setEditItem,
  onChange,
  id,
  groupId,
  isPrice,
  isDate,
  isSelect,
}: IProps) => {
  const [value, setValue] = useState(item?.value);
  useEffect(() => {
    setValue(item?.value as string);
  }, [item]);

  const [selectedValue, setSelectedValue] = useState<IItem>(
    (selectedItem || (isSelect && item)) as IItem
  );
  const [secondValue, setSecondValue] = useState<string>(
    secondItem?.value as string
  );
  const [checkedValue, setCheckedValue] = useState<boolean>(
    checkItem?.value as boolean
  );

  const clearValues = () => {
    setValue(item.value as string);
    setCheckedValue(checkItem?.value as boolean);
    setSecondValue(secondItem?.value as string);
    setSelectedValue((selectedItem || item) as IItem);
  };

  const onFinishEdit = () => {
    if (item.isRequired && !value) {
      return null;
    } else {
      let result = value;
      if (value === '' || !value || value === 'Invalid date') result = null;
      setEditItem(DEFAULT_EDITED_FIELD);

      if (value !== item.value) {
        onChange(result, item.name, isPrice, isDate, groupId || id, id);
      }
      if (
        !!selectedValue &&
        ((selectedItem && selectedValue !== selectedItem) ||
          (item &&
            isSelect &&
            JSON.stringify(selectedValue) !== JSON.stringify(item)))
      ) {
        onChange(
          selectedValue.type || selectedValue.name,
          (selectedItem && selectedItem.type) ||
            (item && item.selectOptions && item.name),
          false,
          isDate,
          groupId || id,
          id
        );
      }
      if (secondValue && secondValue !== secondItem.value) {
        onChange(
          secondValue,
          secondItem.name,
          isPrice,
          isDate,
          groupId || id,
          id
        );
      }
      if (!!checkItem && checkedValue !== checkItem.value) {
        onChange(
          checkedValue,
          checkItem.name,
          false,
          isDate,
          groupId || id,
          id
        );
      }
      clearValues();
    }
  };

  const onCloseEdit = () => {
    setEditItem(DEFAULT_EDITED_FIELD);
    clearValues();
  };

  const handleDate = (value: Date) => {
    setValue(formatDate(value));
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.NX_GOOGLE_API_KEY,
    options: GOOGLE_OPTIONS,
    onPlaceSelected: (place) => {
      setValue(place.formatted_address);
    },
  });

  return {
    localState: {
      ref,
      value,
      selectedValue,
      secondValue,
      checkedValue,
    },
    localActions: {
      setValue,
      setSelectedValue,
      setSecondValue,
      setCheckedValue,
    },
    handlers: {
      onFinishEdit,
      onCloseEdit,
      handleDate,
    },
  };
};

export default useEditedFieldData;
