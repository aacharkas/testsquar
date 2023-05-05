import classNames from 'classnames';
import React, {useState} from 'react';

import {ETextVariant} from '../../constants/enums';
import Typography from '../Typography/Typography';
import styles from './Checkbox.module.css';

interface IProps {
  isDisabled?: boolean;
  isVisible?: boolean;
  label?: string;
  onChange?: (val: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disableFocusStyles?: boolean;
  className?: string;
  isRounded?: boolean;
}

export function Checkbox({
                           isDisabled = false,
                           isVisible = true,
                           label,
                           onChange,
                           checked,
                           className,
                           disableFocusStyles = false,
                           isRounded = false,
                         }: IProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleClick = (event) => {
    setIsChecked(!isChecked);
    onChange && onChange(event);
  };

  return (
    <div className={classNames('flex items-center gap-3', className, {'hidden': !isVisible})}>
      <input
        aria-describedby="comments-description"
        name="comments"
        type={isRounded ? "radio" : "checkbox"}
        className={classNames(
          styles['checked'],
          'h-4 w-4 rounded border-gray-300 text-indigo-800 ',
          {
            'focus:ring-indigo-700': !disableFocusStyles,
            'focus:ring-0': disableFocusStyles,
            'rounded-full': isRounded
          }
        )}
        disabled={isDisabled}
        checked={checked}
        onChange={(e) => handleClick(e)}
      />
      <Typography variant={ETextVariant.sm}>{label}</Typography>
    </div>
  );
}

export default Checkbox;
