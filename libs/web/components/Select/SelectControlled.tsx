import {Listbox, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import classNames from 'classnames';
import React, {Fragment} from 'react';

import {ETextColor, ETextVariant} from '../../constants/enums';
import Typography from '../Typography/Typography';
import SelectItem from './SelectItem';

export interface IItem {
  id: number;
  name: string;
  value?: string;
  type?: string;
}

interface IProps {
  name?: string;
  value?: IItem;
  label?: string;
  options?: IItem[];
  placeholder?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  defaultValue?: IItem;
  onChangeValue?: (IItem) => void;
  className?: string;
  directionClass?: string;
  error?: boolean;
  errorText?: string;
  rightLabel?: string;
}

export function SelectControlled({
                                   label,
                                   value,
                                   options,
                                   isDisabled,
                                   isVisible = true,
                                   placeholder,
                                   defaultValue,
                                   onChangeValue,
                                   className,
                                   directionClass,
                                   error,
                                   errorText,
                                   rightLabel,
                                 }: IProps) {
  if (!isVisible) return null;

  return (
    <div className={className}>
      <Listbox disabled={isDisabled} value={value} onChange={onChangeValue}>
        {({open}) => (
          <div>
            {label && (
              <div className='flex justify-between'>
                <Typography
                  variant={ETextVariant.sm}
                  medium
                  className="text-gray-700"
                >
                  {label}
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
                  'relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left',
                  'shadow-sm focus:border-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-700 sm:text-sm min-h-[38px]',
                  {'border-red-300': error}
                )}
              >
                    <span
                      className={classNames(
                        'block truncate text-sm',
                        !value && 'text-gray-500'
                      )}
                    >
                      {(value && (value?.value || value?.name)) || placeholder}
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
  );
}

export default SelectControlled;
