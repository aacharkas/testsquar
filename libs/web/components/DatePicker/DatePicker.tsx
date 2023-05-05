import React from 'react';
import {useRouter} from 'next/router';
import Datepicker from 'react-tailwindcss-datepicker';
import classNames from 'classnames';

interface IProps {
  value?: Date | string;
  onChange?: (date: Date) => void;
  placeholder?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  className?: string;
  fullWidth?: boolean;
}

export function DatePicker({
                             value,
                             onChange,
                             placeholder,
                             minDate,
                             maxDate,
                             className,
                             fullWidth,
                           }: IProps) {
  const router = useRouter();
  const formatValueToRange = (value: Date | string) => {
    return {
      startDate: value,
      endDate: value,
    }
  };

  const handleValueChange = (newValue) => {
    onChange(newValue?.startDate);
  };

  return (
    <div className={classNames({"md:w-4/5 sm:w-4/5": !fullWidth})}>
      <Datepicker
        i18n={router.locale}
        primaryColor="indigo"
        value={formatValueToRange(value)}
        onChange={handleValueChange}
        useRange={false}
        asSingle
        placeholder={placeholder}
        inputClassName={classNames(className, "pt-2 pb-2 text-gray-900 placeholder:text-gray-500 text-sm bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-700 focus:ring-indigo-700 focus:ring-offset-0 focus:ring-1 transition-none")}
        toggleClassName="hover:bg-none text-gray-400 z-30"
        displayFormat='MMM D, YYYY'
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}

export default DatePicker;
