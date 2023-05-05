import {Listbox} from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';

import Checkbox from '../Checkbox/Checkbox';

interface IProps {
  item: { id: number; name: string };
  multi?: boolean;
}

export function SelectItem({item, multi = false}: IProps) {
  return (
    <>
      {
        <Listbox.Option
          key={item.id}
          className="text-gray-900 relative cursor-default select-none py-2 px-3 hover:bg-gray-100"
          value={item}
        >
          {({selected}) => {
            return (
              <>
              <span
                className={classNames(
                  selected ? 'font-semibold' : 'font-normal',
                  'flex block truncate my-1 text-sm'
                )}
              >
                {multi && <Checkbox checked={selected} disableFocusStyles/>}
                {item.name}
              </span>
              </>
            )
          }}
        </Listbox.Option>
      }
    </>
  );
}

export default SelectItem;
