import {useTranslation} from 'next-i18next';
import React from 'react';
import TableItem from '../../../../libs/web/components/Table/TableItem';
import ProgressBar from './ProgressBar';

interface IProps {
  size: number;
  percent: number;
}

const EmptyImportTableItem = ({size, percent}: IProps) => {
  const {t} = useTranslation('imports');

  return (
    <TableItem
      columnsSize={size}
      columnsSizeTablet={2}
      className='sm:items-stretch sm:grid'
    >
      <div
        className="flex flex-col col-span-1 sm:col-span-2 items-center justify-center sm:block md:items-start">
        <div className='w-full'>
          <div className="w-full h-3 bg-gray-200 rounded-md md:mb-2 md:w-3/4 sm:mb-2 sm:w-3/4"/>
          <div className="w-full h-3 bg-gray-200 rounded-md mb-2 hidden md:block sm:block"/>
        </div>
        <div className='w-full hidden md:block sm:block mt-6'>
          <div className="w-full h-3 bg-gray-200 rounded-md md:mb-2 md:w-3/4 sm:mb-2 sm:w-3/4"/>
          <div className="w-full h-3 bg-gray-200 rounded-md mb-2 hidden md:block sm:block"/>
        </div>
      </div>
      <div className="flex col-span-1 items-center md:hidden sm:hidden">
        <div className="w-full h-3 bg-gray-200 rounded-md"/>
      </div>
      <div className="flex flex-col col-span-1 justify-center md:col-span-2 sm:hidden">
        <div className='w-full'>
          <div className="w-full h-3 bg-gray-200 rounded-md mb-2 md:hidden sm:hidden"/>
          <div className="w-3/4 md:w-2/5 h-3 bg-gray-200 rounded-md md:mb-2"/>
          <div className="w-full md:w-1/2 h-3 bg-gray-200 rounded-md mb-2 hidden md:block sm:block"/>
        </div>
        <div className='w-full hidden md:block mt-6'>
          <div className="w-3/4 md:w-2/5 h-3 bg-gray-200 rounded-md md:mb-2"/>
          <div className="w-full md:w-1/2 h-3 bg-gray-200 rounded-md mb-2 hidden md:block sm:block"/>
        </div>
      </div>
      <div className="flex col-span-1 items-center md:hidden sm:hidden">
        <div className="w-full h-3 bg-gray-200 rounded-md"/>
      </div>
      <div className="flex col-span-1 items-center md:hidden sm:hidden">
        <div className="w-full h-3 bg-gray-200 rounded-md"/>
      </div>
      <div className="flex col-span-1 items-center sm:hidden md:hidden">
        <div className="w-full h-3 bg-gray-200 rounded-md"/>
      </div>
      <div
        className="flex items-center col-span-2 md:col-span-1 md:ml-[-20px] sm:ml-[-15px] md:items-start sm:items-start">
        <ProgressBar t={t} currentPercent={percent}/>
      </div>
      <div className="hidden md:block sm:block flex flex-col md:col-span-4 col-span-3 sm:mt-2">
        <div className="w-1/4 h-3 bg-gray-200 rounded-md mb-2 sm:w-1/2"/>
        <div className="w-1/2 h-3 bg-gray-200 rounded-md mb-2 sm:w-full"/>
      </div>
      <div className="hidden md:block sm:block flex flex-col sm:col-span-3 sm:mt-1 sm:mb-1">
        <div className="w-full h-3 bg-gray-200 rounded-md mb-2 sm:w-1/2"/>
      </div>
      <div className="hidden sm:block flex flex-col col-span-2">
        <div className="w-3/4 h-3 bg-gray-200 rounded-md mb-2"/>
        <div className="w-full h-3 bg-gray-200 rounded-md"/>
      </div>
      <div className="hidden sm:block flex flex-col col-span-2 mb-2">
        <div className="w-3/4 h-3 bg-gray-200 rounded-md mb-2"/>
        <div className="w-full h-3 bg-gray-200 rounded-md"/>
      </div>
    </TableItem>
  );
};

export default EmptyImportTableItem;
