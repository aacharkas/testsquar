import React, { FC } from 'react';
import { TypographyComponentProps } from './Typography.constants';

const TypographyComponent: FC<TypographyComponentProps> = ({
  as: Tag = 'span',
  children, ...props }: TypographyComponentProps
) => {
  return <Tag {...props}>{children}</Tag>;
};

export default TypographyComponent;
