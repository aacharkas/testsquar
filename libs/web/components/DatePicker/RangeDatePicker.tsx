import { useTranslation } from 'next-i18next';
import React from 'react';
import dayjs from 'dayjs'

import DatePicker from './DatePicker';

interface IDateRange {
  dateFrom: Date | string | null;
  dateTo: Date | string | null;
}
interface IProps {
  value?: IDateRange;
  onChangeDate?: (date: IDateRange) => void;
  minDate?: Date | string;
  maxDate?: Date | string;
}

export function RangeDatePicker({
  value,
  onChangeDate,
  minDate,
  maxDate,
}: IProps) {
  const { t } = useTranslation('buttons');

  const handleDateFromChange = (newValue: Date | string) => {
    let newRange = [newValue, value.dateTo];
    handleRange(newRange);
  };
  
  const handleDateToChange = (newValue: Date | string) => {
    let newRange = [value.dateFrom, newValue];
    handleRange(newRange);
  };
  
  const handleRange = (range: (Date | string)[]) => {
    if (dayjs(range[0]).isAfter(dayjs(range[1]), 'day')) {
      [range[0], range[1]] = [range[1], range[0]];
    }
    onChangeDate({
      dateFrom: range[0],
      dateTo: range[1],
    });
  };

  return (
    <div className="flex items-center gap-4 md:flex-wrap sm:flex-wrap">
      <DatePicker 
        onChange={handleDateFromChange}
        value={value?.dateFrom}
        placeholder={t('date_from')}
        minDate={minDate}
        maxDate={maxDate}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-2 rounded-sm border-gray-500" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-gray-500"/>
        </div>
      </div>
      <DatePicker 
        onChange={handleDateToChange}
        value={value?.dateTo}
        placeholder={t('date_to')}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}

export default RangeDatePicker;
