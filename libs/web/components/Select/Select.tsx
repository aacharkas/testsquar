import {Listbox, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import classNames from 'classnames';
import React, {Fragment, useEffect, useState} from 'react';

import {ETextColor, ETextVariant} from '../../constants/enums';
import Typography from '../Typography/Typography';
import SelectItem from './SelectItem';

interface IItem {
  id: number;
  name: string;
}

interface IProps {
  name?: string;
  value?: string;
  label?: string;
  options?: IItem[];
  placeholder?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  defaultValue?: IItem;
  onChangeValue?: (string) => void;
  className?: string;
  directionClass?: string;
  error?: boolean;
  errorText?: string;
  nameValueToReturn?: string;
  rightLabel?: string;
}

export function Select({
                         label,
                         value,
                         options,
                         isDisabled,
                         isVisible = true,
                         placeholder,
                         defaultValue,
                         onChangeValue,
                         className,
                         rightLabel,
                         directionClass,
                         error,
                         errorText,
                         nameValueToReturn = '',
                       }: IProps) {
  const [selected, setSelected] = useState<{ id: number; name: string }>(
    defaultValue ||
    (!placeholder && options[0])
  );
  useEffect(() => { 
    const isValue = nameValueToReturn ? options.find((el) => el[nameValueToReturn] === value) : options.find((el) => el.name === value);
    if (isValue) {
      setSelected(isValue);
    } 
  }, [options, value, nameValueToReturn]);

  useEffect(() => {
    if (selected) {
      if (nameValueToReturn) {
        onChangeValue(selected[nameValueToReturn]);
      } else {
        onChangeValue(selected.name);
      }
    }
  }, [selected]);

  return (
    <>
      {isVisible && (
        <div className={className}>
          <Listbox
            disabled={isDisabled}
            value={selected}
            onChange={setSelected}
          >
            {({open}) => (
              <div>
                {!!label && (
                  <div className="flex justify-between">
                    <Typography
                      variant={ETextVariant.sm}
                      color={ETextColor.gray}
                      className="sm:block sm:text-left"
                      medium
                    >
                      {label}{' '}
                    </Typography>
                    {!!rightLabel && (
                      <span className="text-sm text-gray-500 justify-end">
                      {rightLabel}
                    </span>
                    )}
                  </div>
                )}
                <div className="relative mt-1">
                  <Listbox.Button
                    className={classNames(
                      'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200',
                      'relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-700 sm:text-sm',
                      {'relative w-full cursor-default rounded-md border border-red-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 sm:text-sm': error},
                    )}
                  >
                    <span
                      className={classNames(
                        'block truncate text-sm',
                        !selected && 'text-gray-500'
                      )}
                    >
                      {(selected && selected.name) || placeholder}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className={classNames(
                        'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                        directionClass
                      )}
                    >
                      {options.map((item) => (
                        <SelectItem key={item.id} item={item}/>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </div>
            )}
          </Listbox>
          {!!errorText && error && (
            <p className="mt-2 text-sm text-red-600">{errorText}</p>
          )}
        </div>
      )}
    </>
  );
}

export default Select;
