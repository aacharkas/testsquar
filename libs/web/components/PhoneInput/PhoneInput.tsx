import classNames from 'classnames';
import React from 'react';
import Input from 'react-phone-number-input/input';

import {ETextVariant} from '../../constants/enums';
import Typography from '../Typography/Typography';

interface IProps {
  label?: string | React.ReactNode;
  rightLabel?: string;
  value?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  error?: boolean;
  errorText?: string;
  onChangeText?: (val: any) => void;
  className?: string;
  inputClassName?: string;
  children?: React.ReactNode;
  maxLength?: number;
}

export function PhoneInput({
                             label,
                             value,
                             placeholder = '',
                             isDisabled = false,
                             isVisible = true,
                             error,
                             errorText,
                             onChangeText,
                             className,
                             inputClassName,
                             rightLabel,
                             maxLength = 14,
                             ...props
                           }: IProps) {
  return (
    <div className={classNames(className, !isVisible && 'hidden')}>
      <div className="flex justify-between">
        {!!label && (
          <>
            <Typography
              variant={ETextVariant.sm}
              medium
              className="text-gray-700"
            >
              {label}{' '}
            </Typography>
            {!!rightLabel && (
              <span className="text-sm text-gray-500 justify-end">
                {rightLabel}
              </span>
            )}
          </>
        )}
      </div>
      <div className="mt-1 relative">
        <Typography
          variant={ETextVariant.sm}
          className="absolute top-1/4 left-3"
        >
          +1
        </Typography>
        <Input
          country="US"
          disabled={isDisabled}
          className={classNames(
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200',
            'block w-full rounded-md border-gray-300 text-sm text-gray-900 pl-7',
            {'bg-slate-100': isDisabled, 'border-red-300': error},
            inputClassName
          )}
          placeholder={placeholder}
          onChange={onChangeText}
          aria-invalid={!!error}
          maxLength={maxLength}
          value={value ?? ''}
          {...props}
        />
      </div>
      {!!errorText && error && (
        <p className="mt-2 text-sm text-red-600">{errorText}</p>
      )}
    </div>
  );
}

export default PhoneInput;
