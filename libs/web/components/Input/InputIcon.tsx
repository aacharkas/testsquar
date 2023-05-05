import classNames from 'classnames';
import React, { ReactElement } from 'react';

interface IProps {
  value?: string;
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
  icon?: ReactElement;
}

export function InputIcon({
  value,
  placeholder = '',
  isDisabled = false,
  className,
  icon,
  ...props
}: IProps) {

  return (
    <div
      className={classNames('relative xmt-1 rounded-md shadow-sm', className)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        disabled={isDisabled}
        value={value || ''}
        className="block text-sm w-full rounded-md border-gray-300 pl-10 pr-10 focus:border-indigo-700 focus:ring-indigo-700 sm:text-sm"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default InputIcon;
