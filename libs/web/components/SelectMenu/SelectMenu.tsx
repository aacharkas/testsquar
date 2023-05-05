import React from 'react';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import SelectMenuItem from './SelectMenuItem';

interface IProps {
  name?: string;
  label?: string;
  options?: { id: number; name: string }[];
  placeholder?: string;
  isDisabled?: boolean;
  defaultValue?: { id: number; name: string };
}

export function SelectMenu({
  label,
  options,
  isDisabled,
  placeholder,
  defaultValue = null,
}: IProps) {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <Listbox disabled={isDisabled} value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
          )}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-700 sm:text-sm">
              <span
                className={classNames(
                  'block truncate',
                  !selected && 'text-gray-500'
                )}
              >
                {(selected && selected.name) || placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <div className="block">
                  <ChevronUpIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                  <ChevronDownIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((item) => (
                  <SelectMenuItem key={item.id} item={item} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default SelectMenu;
