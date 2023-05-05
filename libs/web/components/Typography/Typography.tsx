import React from 'react';
import classNames from 'classnames';
import styles from './Typography.module.css';
import { defaultColors, defaultStyles, defaultTags } from './Typography.constants';
import TypographyComponent from './TypographyComponent';
import { TypographyProps } from './Typography.constants';

const Typography = ({
  children,
  variant,
  color,
  uppercase,
  underline,
  italic,
  bold,
  medium,
  hidden,
  className,
  onClick
}: TypographyProps) => (
  <TypographyComponent
    as={defaultTags[variant]}
    onClick={onClick}
    className={classNames(
      'typography',
      defaultStyles[variant],
      defaultColors[color],
      className,
      {
        [styles['typography_uppercase']]: uppercase,
        [styles['typography_underline']]: underline,
        [styles['typography_italic']]: italic,
        [styles['typography_bold']]: bold,
        [styles['typography_medium']]: medium,
        [styles['typography_hidden']]: hidden
      }
    )}
  >
    {children}
  </TypographyComponent>
);

export default Typography;
