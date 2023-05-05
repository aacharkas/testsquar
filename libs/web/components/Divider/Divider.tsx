import React from "react";
import classNames from 'classnames';

interface IProps {
  className?: string;
  direction?: string;
}

const Divider = ({
  className,
  direction = 'horizontal',
}: IProps) => {
  return (
    <div className={classNames(
      'h-full border-gray-200',
      { 'border-r': direction === 'vertical' },
      { 'border-t': direction === 'horizontal' },
      className
      )}
    />
  );
}


export default Divider;
