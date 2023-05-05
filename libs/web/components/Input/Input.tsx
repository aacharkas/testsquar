import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, {useState} from 'react';

import {ETextVariant} from '../../constants/enums';
import Typography from '../Typography/Typography';
import {inputHelper} from './Input.helper';

interface IProps {
  refInput?: any;
  label?: string | React.ReactNode;
  rightLabel?: string;
  password?: boolean;
  value?: string | number;
  type?: 'tel' | 'text' | 'password' | 'email';
  placeholder?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  error?: boolean;
  errorText?: string;
  onChangeText?: (val: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children?: React.ReactNode;
  onKeyUp?: () => void;
  maxLength?: number;
}

export function Input({
                        refInput,
                        label,
                        password = false,
                        value,
                        type = 'text',
                        placeholder = '',
                        isDisabled = false,
                        isVisible = true,
                        error,
                        errorText,
                        onChangeText,
                        className,
                        rightLabel,
                        maxLength = 50,
                        ...props
                      }: IProps) {
  const [showPassword, setShowPassword] = useState<boolean>(password);
  const classStyles = inputHelper(error);       
  return (
    <div className={classNames(className, {'hidden': !isVisible})}>
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
        {password && (
          <button
            className="text-sm text-gray-500 flex justify-between items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5 mr-2"/>
            ) : (
              <EyeSlashIcon className="h-5 w-5 mr-2"/>
            )}
            <Typography variant={ETextVariant.sm}>
              {showPassword ? 'Show' : 'Hide'}
            </Typography>
          </button>
        )}
      </div>
      <div className="mt-1">
        <input
          ref={refInput}
          type={showPassword ? 'password' : type}
          disabled={isDisabled}
          className={classNames(
            'relative disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200',
            'block w-full rounded-md text-sm text-gray-900 bg-white',
            {'bg-slate-100': isDisabled},
            classStyles
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

export default Input;
