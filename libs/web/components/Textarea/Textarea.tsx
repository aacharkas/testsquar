import React from 'react';

import { ETextVariant } from '../../constants/enums';
import Typography from '../Typography/Typography';
import styles from './Textarea.module.css';
import { textareaHelper } from './Textarea.helper';
import classNames from 'classnames';

interface IProps {
  name?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  maxLength?: number;
  value?: string;
  error?: boolean;
  errorText?: string;
  className?: string;
  rightLabel?: string;
  minHeight?: boolean;
  onChangeText?: (val: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({
  name,
  label,
  isDisabled,
  placeholder,
  onChangeText,
  value,
  maxLength = 400,
  className,
  rightLabel,
  error,
  errorText,
  minHeight,
}: IProps) {
  const classStyles = textareaHelper(error);
  return (
    <div className={className}>
      {(label || rightLabel) && (
        <label
          htmlFor="comment"
          className="flex justify-between text-sm font-medium text-gray-700"
        >
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
        </label>
      )}
      <div className="mt-1">
        <textarea
          rows={4}
          maxLength={maxLength}
          name={name}
          onChange={onChangeText}
          placeholder={placeholder}
          disabled={isDisabled}
          className={classNames(classStyles, 
            {
              'min-h-[150px]': minHeight,
            },
          )}
          value={value ?? ''}
        />
      </div>
      {!!errorText && error && (
        <p className="mt-2 text-sm text-red-600">{errorText}</p>
      )}
    </div>
  );
}

export default Textarea;
