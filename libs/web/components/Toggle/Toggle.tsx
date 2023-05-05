import React, { useState } from 'react';
import styles from './Toggle.module.css';
import classNames from 'classnames';

interface IProps {
  checked?: boolean;
  isDisabled?: boolean
}

export function Toggle({
  checked = false,
  isDisabled = false
}:IProps) {
  const [enabled, setEnabled] = useState<boolean>(checked);

  return (
    <button
      type="button"
      defaultChecked={enabled}
      onClick={() => setEnabled(!enabled)}
      disabled={isDisabled}
      className={classNames(
        enabled ? styles['toggle-on'] : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </button>
  );
}

export default Toggle;
