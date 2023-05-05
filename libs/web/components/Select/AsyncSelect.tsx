import {DocumentNode, useQuery} from '@apollo/client';
import {Combobox} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, {useCallback, useMemo, useState, useEffect} from 'react';

import {ETextColor, ETextVariant} from '../../constants/enums';
import {useDebounce} from '../../hooks/useDebounce';
import search from '../Search/Search';
import Spinner from '../Spinner/Spinner';
import Typography from '../Typography/Typography';

const SEARCH_SIMBOLS = 2;

export interface IItem {
  id: number;
  name: string;
}

interface IProps {
  name?: string;
  value?: IItem;
  label?: string;
  isDisabled?: boolean;
  defaultValue?: IItem;
  onChange?: (element: IItem) => void;
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
  addNew?: string;
  onClick?: () => void;
  onFinishEdit?: () => void;
  onCloseEdit?: () => void;
  isModalSelect?: boolean;
  withoutNew?: boolean;
  maxLength?: number;
}

export const AsyncSelect = ({
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
                              addNew = '',
                              onClick,
                              isModalSelect = false,
                              withoutNew = false,
                              maxLength,
                            }: IProps) => {
  const [query, setQuery] = useState<string>('');
  const [skipElements, setSkipElements] = useState<number>(0);

  const notSkipRequest = useMemo(
    () => (initialLoad && !query) || query.length > SEARCH_SIMBOLS,
    [initialLoad, query, isDisabled, skip]
  );

  const comparePeople = useCallback(
    (a: IItem, b: IItem): boolean =>
      a?.[responseNameName]?.toLowerCase() ===
      b?.[responseNameName]?.toLowerCase(),
    [responseNameName]
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

  const asyncSelectSearch = useDebounce((value) => {
    setSkipElements(0);
    setQuery(value);
  });
  useEffect(() => {
    if (addNew) {
      asyncSelectSearch(value?.name);
    }
  }, [value]);
  const convertedData = useMemo(() => {
    // get totalAmount
    let totalAmount =
      data?.[responsePathToArray]?.totalCount ||
      previousData?.[responsePathToArray]?.totalCount;
    // get arrays of data
    const previousDataArray = previousData?.[responsePathToArray]?.rows ?? [];
    const currentDataArray = data?.[responsePathToArray]?.rows ?? [];
    // get array to process (concatenation of old and new data)
    let processValue = [];
    if (skipElements > 0) {
      processValue = [...previousDataArray, ...currentDataArray];
    } else {
      processValue = data ? currentDataArray : previousDataArray;
    }
    // formate data for async select
    let resultArray = processValue.map((item) => ({
      id: item?.[responseIdName],
      name: item?.[responseNameName],
    }));
    // remove already used values from array
    if (removeIds) {
      resultArray = resultArray.filter((item) => !removeIds.includes(item?.id));
    }
    // load new data if user used data that list contain less than 5 elements
    if (
      resultArray.length < 5 &&
      totalAmount >= skipElements + numberRequestElements &&
      !loadRequest
    ) {
      setSkipElements(skipElements + numberRequestElements);
    }
    // return to user only some elements
    resultArray = resultArray.slice(0, numberShowToUser);
    // apply custom convert function if provided
    if (convertHelpFunction) {
      return convertHelpFunction(resultArray);
    } else {
      return resultArray;
    }
  }, [data, removeIds]);

  return (
    <div className={classNames(className)}>
      {label && (
        <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>
          {label}
        </Typography>
      )}
      <Combobox
        value={value ?? {}}
        by={comparePeople}
        onChange={onChange}
        disabled={isDisabled}
      >
        <Combobox.Button as="div" className="flex items-center mt-1 relative">
          <Combobox.Input
            onChange={(event) => asyncSelectSearch(event.target.value)}
            displayValue={(person: IItem) =>
              (person?.name || person?.[responseNameName]) ?? ''
            }
            autoComplete={'off'}
            aria-disabled={isDisabled}
            maxLength={maxLength}
            // disabled={isDisabled}
            className={classNames(
              'w-full rounded-md text-sm text-gray-900 flex items-center mt-1 disabled:cursor-not-allowed',
              'disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 border-gray-300',
              {'bg-slate-100': isDisabled, 'border-red-300': error}
            )}
          />
          <ChevronDownIcon className="h-6 w-6 mr-2 absolute right-1 top-3"/>
          {(loading || loadRequest) && (
            <Spinner size="xsmall" className="absolute right-10 top-2.5"/>
          )}
        </Combobox.Button>

        <Combobox.Options
          className={classNames({"absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm": !addNew},
            {"absolute z-10 mt-1 max-h-60 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm": !!addNew},
            {"absolute z-10 mt-1 max-h-60 w-[440px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm": isModalSelect})}>
          {convertedData?.map((item) => (
            <Combobox.Option
              key={item.id}
              value={item}
              className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-gray-100"
              // className="py-2 px-3 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-gray-800"
            >
              {({selected}) => (
                <>
                  <span
                    className={classNames(
                      selected ? 'font-semibold' : 'font-normal',
                      'flex block truncate my-1 text-sm'
                    )}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </Combobox.Option>
          ))}
          {!convertedData?.length && (
            <Combobox.Option
              key="no_options"
              value="no_options"
              className="text-gray-500 relative cursor-default select-none py-2 pl-3 pr-3 hover:bg-gray-100"
            >
              <span
                className={classNames(
                  'font-normal',
                  'flex justify-between block truncate my-1 text-sm'
                )}
              >
                Not found
                {(addNew && !withoutNew) &&
                  <span onClick={onClick} className='text-indigo-900 text-xs mt-0.5'>
                  {addNew}
                </span>}
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
