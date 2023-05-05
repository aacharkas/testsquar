import { DocumentNode, useQuery } from '@apollo/client';
import { Combobox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

import { ETextColor, ETextVariant } from '../../constants/enums';
import { useDebounce } from '../../hooks/useDebounce';
import Spinner from '../Spinner/Spinner';
import Typography from '../Typography/Typography';
import Checkbox from '../Checkbox/Checkbox';
import { convertAsyncData } from './AsyncMultiSelect.helpers';

const SEARCH_SIMBOLS = 2;
export interface IItem {
  id: number;
  name: string;
}

interface IProps {
  name?: string;
  value?: IItem[];
  label?: string;
  isDisabled?: boolean;
  defaultValue?: IItem;
  onChange?: (val) => void;
  className?: string;
  selectDown?: boolean;
  loadOptions?: (name: string) => Promise<IItem[]>;
  loading?: boolean;
  skip?: boolean;
  variableName: string;
  responsePathToArray: string;
  queryStructure: DocumentNode;
  convertHelpFunction?: (items: object) => IItem[];
  responseIdName?: string;
  responseNameName?: string;
  errorText?: string;
  numberRequestElements?: number;
  numberShowToUser?: number;
  error?: boolean;
  requestOptions?: object;
  initialLoad?: boolean;
  removeIds?: string[];
  defaultValueNeeded?:string;
}
export const AsyncMultiSelect = ({
  label,
  className,
  onChange,
  value,
  variableName,
  skip = false,
  loading,
  queryStructure,
  convertHelpFunction,
  responsePathToArray,
  numberRequestElements = 5,
  numberShowToUser = 5,
  responseIdName = 'id',
  responseNameName = 'name',
  requestOptions,
  errorText,
  error,
  isDisabled,
  initialLoad = false,
  removeIds,
  defaultValueNeeded='',
}: IProps) => {
  const [query, setQuery] = useState<string>('');
  const [skipElements, setSkipElements] = useState<number>(0);
  const [searchMode, setSearchMode]=useState<boolean>(false);
  const notSkipRequest = useMemo(
    () => (initialLoad && !query) || query.length > SEARCH_SIMBOLS,
    [initialLoad, query, isDisabled, skip]
  );

  const {
    loading: loadRequest,
    data,
    previousData,
  } = useQuery(queryStructure, {
    skip: skip || isDisabled || !notSkipRequest,
    variables: {
      ...requestOptions,
      [variableName]: query,
      take: numberRequestElements,
      skip: skipElements,
    },
  });

  useEffect(() => {
    if (value && value[0]?.id === 0) {
      setQuery('');
    }
  }, [value]);

  const asyncSelectSearch = useDebounce((value) => {
    setSkipElements(0);
    setQuery(value);
  });

  const convertedData = useMemo(() =>
    convertAsyncData({
      responsePathToArray,
      previousData,
      skipElements,
      responseIdName,
      responseNameName,
      numberRequestElements,
      loadRequest,
      setSkipElements,
      numberShowToUser,
      defaultValueNeeded,
      data,
      convertHelpFunction,
      removeIds,
      query,
    }), [data]);
  return (
    <div className={classNames(className)}>
      {label && (
        <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>
          {label}
        </Typography>
      )}
      <Combobox
        value={value ?? []}
        onChange={onChange}
        disabled={isDisabled}
        multiple
      >
        <Combobox.Button as="div" className="flex items-center mt-1 relative">
          <Combobox.Input
            onChange={(event) => asyncSelectSearch(event.target.value)}
            displayValue={searchMode?()=>'':(values: []) => values?.map((item:IItem) => item.name).join(', ')}
            autoComplete={'off'}
            aria-disabled={isDisabled}
            // disabled={isDisabled}
            onFocus={()=>setSearchMode(true)}
            onBlur={()=>setSearchMode(false)}
            className={classNames(
              'w-full rounded-md text-sm text-gray-900 flex items-center mt-1 disabled:cursor-not-allowed',
              'disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 border-gray-300',
              { 'bg-slate-100': isDisabled, 'border-red-300': error }
            )}
          />
          <ChevronDownIcon className="h-4 w-4 mr-2 absolute right-1 top-4" />
          {(loading || loadRequest) && (
            <Spinner size="xsmall" className="absolute right-10 top-2.5" />
          )}
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-80 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {convertedData?.map((item) => (
            <Combobox.Option
              key={item.id}
              value={item}
              className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-gray-100"
              // className="py-2 px-3 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-gray-800"
            >
              {({ selected }) =>{
                // console.log('Selected: ', item.id, selected);
                return (
                <div className='flex items-center'>
                  <Checkbox checked={value?.findIndex(valueItem =>valueItem.id == item.id) !== -1} disableFocusStyles className='mr-2' />
                  <span
                    className={classNames(
                      selected ? 'font-semibold' : 'font-normal',
                      'flex block truncate my-1 text-sm'
                    )}
                  >
                    {item.name}
                  </span>
                </div>
              )
              } }
            </Combobox.Option>
          ))}
          {!convertedData?.length && (
            <Combobox.Option
              key="no_options"
              value="no_options"
              className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-gray-100"
            >
              <span
                className={classNames(
                  'font-normal',
                  'flex block truncate my-1 text-sm'
                )}
              >
                Not found
              </span>
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox>
      {!!errorText && error && (
        <p className="mt-2 text-sm text-red-600">{errorText}</p>
      )}
    </div>
  );
};
