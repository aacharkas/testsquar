import React, { ElementType } from 'react';

import { ETextColor, ETextVariant } from '../../constants/enums';
import styles from './Typography.module.css';

export const defaultStyles = {
  xs: styles['typography_xs'],
  sm: styles['typography_sm'],
  base: styles['typography_base'],
  lg: styles['typography_lg'],
  xl: styles['typography_xl'],
  xl_2: styles['typography_xl2'],
  xl_3: styles['typography_xl3'],
  xl_4: styles['typography_xl4'],
  xl_5: styles['typography_xl5'],
  xl_6: styles['typography_xl6'],
};

export const defaultTags = {
  xs: 'p',
  sm: 'p',
  base: 'span',
  lg: 'span',
  xl: 'h1',
  xl_2: 'h2',
  xl_3: 'h3',
  xl_4: 'h4',
  xl_5: 'h5',
  xl_6: 'h6',
};

export const defaultColors = {
  black: styles['typography_black'],
  primary: styles['typography_primary'],
  secondary: styles['typography_secondary'],
  error: styles['typography_error'],
  gray: styles['typography_gray'],
  white: styles['typography_white'],
};

export interface TypographyProps {
  children: string | React.ReactNode;
  variant: ETextVariant;
  color?: ETextColor;
  uppercase?: boolean;
  underline?: boolean;
  italic?: boolean;
  bold?: boolean;
  medium?: boolean;
  hidden?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface TypographyComponentProps {
  as?: ElementType | string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
