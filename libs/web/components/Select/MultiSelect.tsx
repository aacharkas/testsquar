import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useCallback, useState } from 'react';

import { ETextColor, ETextVariant } from '../../constants/enums';
import Typography from '../Typography/Typography';
import SelectItem from './SelectItem';

export const checkAllFilterValue = (changedItem, newItems, allItems) => {
  let recheckedValues = newItems;
  if (!newItems.length || changedItem?.id === allItems[0]?.id || !changedItem) {
    recheckedValues = [allItems[0]];
  } else if (
    newItems.some((item) => item.id === allItems[0]?.id) &&
    newItems.length > 1
  ) {
    recheckedValues = newItems.filter((item) => item?.id !== allItems[0]?.id);
  }
  return recheckedValues;
};

export const updateFilters = (filterItem, selectedItems) => {
  let newItems = [];
  if (!selectedItems.some((item) => item?.id === filterItem?.id)) {
    newItems = [...selectedItems, filterItem];
  } else {
    newItems = selectedItems.filter((item) => item?.id !== filterItem?.id);
  }
  return newItems;
};

export const handleMultiSelectChanges = (selectedItems, newItems, allItems) => {
  let arrayA, arrayB;
  if (selectedItems.length > newItems.length) {
    arrayA = selectedItems;
    arrayB = newItems;
  } else {
    arrayA = newItems;
    arrayB = selectedItems;
  }
  const arrayBIds = arrayB.map((item) => item?.id);
  const newValue = arrayA.find((item) => !arrayBIds?.includes(item?.id));
  return checkAllFilterValue(newValue, newItems, allItems);
};

type TMultiSelectItem = { id: number; name: string };

interface IProps {
  name?: string;
  label?: string;
  options?: TMultiSelectItem[];
  isDisabled?: boolean;
  defaultValue?: TMultiSelectItem;
  values?: TMultiSelectItem[];
  setValues?: (val) => void;
}

export function MultiSelect({
  label,
  options,
  isDisabled,
  defaultValue,
  values,
  setValues,
}: IProps) {
  return (
    <Listbox
      disabled={isDisabled}
      multiple
      value={values}
      onChange={(newSelected: TMultiSelectItem[]) => setValues(newSelected)}
    >
      {({ open }) => (
        <>
          {label && (
            <Typography
              variant={ETextVariant.sm}
              color={ETextColor.gray}
              medium
            >
              {label}
            </Typography>
          )}
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-700 sm:text-sm">
              <Typography variant={ETextVariant.sm} className="block truncate">
                {values && values.map((item) => item && `${item.name} `)}
              </Typography>
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((item) => (
                  <SelectItem key={item.id} item={item} multi />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default MultiSelect;
