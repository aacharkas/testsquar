import React from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

interface IProps {
  item: { id: number; name: string };
}

export function SelectMenuItem({ item }: IProps) {
  return (
    <>
      {
        <Listbox.Option
          key={item.id}
          className={({ active }) =>
            classNames(
              active ? 'text-white bg-indigo-600' : 'text-gray-900',
              'relative cursor-default select-none py-2 pl-3 pr-9'
            )
          }
          value={item}
        >
          {({ selected, active }) => (
            <>
              <span
                className={classNames(
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate'
                )}
              >
                {item.name}
              </span>

              {selected ? (
                <span
                  className={classNames(
                    active ? 'text-white' : 'text-indigo-600',
                    'absolute inset-y-0 right-0 flex items-center pr-4'
                  )}
                >
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              ) : null}
            </>
          )}
        </Listbox.Option>
      }
    </>
  );
}

export default SelectMenuItem;
