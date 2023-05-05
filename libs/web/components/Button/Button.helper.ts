import classNames from 'classnames';

import styles from './Button.module.css';

export function buttonHelper(
  theme: string,
  size: string,
  shape: string,
  icon: boolean
) {
  let buttonTheme, buttonSize, buttonShape, iconButton;

  if (icon) {
    iconButton =
      'p-2 rounded-full border-transparent text-primary-500 hover:bg-gray-50';
  } else {
    switch (theme) {
      case 'light':
        buttonTheme = classNames(
          'shadow-sm border-gray-300 text-primary-700 hover:bg-gray-50',
          styles['light-theme']
        );
        break;
      case 'outline':
        buttonTheme = classNames(
          'hover:bg-gray-50 border-0',
          styles['light-theme']
        );
        break;
      case 'dark':
      default:
        buttonTheme = classNames(
          'shadow-sm border-transparent bg-indigo-600 text-white hover:bg-indigo-700',
          styles['dark-theme']
        );
        break;
    }

    switch (size) {
      case 'small':
        buttonSize = 'px-3 py-1.5 text-xs sm:px-2';
        break;
      case 'big':
      default:
        buttonSize = 'px-4 py-2 text-base';
        break;
    }

    switch (shape) {
      case 'circle':
        buttonShape = 'rounded-full';
        break;
      case 'rectangle':
      default:
        buttonShape = 'rounded-md';
        break;
    }
  }

  return {
    buttonTheme,
    buttonSize,
    buttonShape,
    iconButton,
  };
}
