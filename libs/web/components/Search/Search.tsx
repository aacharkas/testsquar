import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';

interface IProps {
  value?: string;
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
  onChangeText: (e) => void;
}

export function Search({
  value,
  placeholder = '',
  isDisabled = false,
  className,
  onClick,
  onChangeText,
}: IProps) {
  return (
    <div
      className={classNames('relative xmt-1 rounded-md shadow-sm', className)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        name="search"
        disabled={isDisabled}
        value={value || ''}
        onChange={(e) => onChangeText(e.target.value)}
        onClick={onClick}
        className="block w-full rounded-md border-gray-300 pl-10 pr-10 focus:border-indigo-700 focus:ring-indigo-700 sm:text-sm"
        placeholder={placeholder}
      />
      {!!value && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <XCircleIcon
            onClick={() => onChangeText('')}
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}

export default Search;
