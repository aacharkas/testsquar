import React from 'react';
import classNames from "classnames";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const TableBody = ({ children, className }: IProps) => {
  return (
    <div className={classNames("bg-white rounded-b-md", className)}>
      <ul className="divide-y divide-gray-200">{children}</ul>
    </div>
  );
};

export default TableBody;
