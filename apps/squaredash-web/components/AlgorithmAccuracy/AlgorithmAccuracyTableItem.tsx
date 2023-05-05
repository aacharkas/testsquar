import React from 'react';

import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {TAlgorithm, TAlgorithmDocument} from './AlgorithmAccuracy.types';
import Checkbox from '../../../../libs/web/components/Checkbox/Checkbox';
import Spinner from "../../../../libs/web/components/Spinner/Spinner";
import {useTranslation} from "next-i18next";

interface IProps {
  item: TAlgorithm;
  size: number;
  disableAll: boolean;
  onClickItem?: (item?: string) => void;
  selectedDocuments: string[];
  processedDocument: TAlgorithmDocument | null;
}

const AlgorithmAccuracyTableItem = (
  {
    item,
    size,
    disableAll,
    onClickItem,
    selectedDocuments,
    processedDocument
  }: IProps) => {
  const { t } = useTranslation('algorithm_accuracy');
  const checked = selectedDocuments.includes(item?.key);
  return (
    <TableItem
      columnsSize={size}
      columnsSizeTablet={1}
      onClick={() => onClickItem(item?.key)}
    >
      <div className="flex col-span-2 items-center">
        <div className="flex">
          <Checkbox
            // onChange={() => handleSourceFilters(item)}
            isDisabled={disableAll}
            checked={checked}
          />
          <Typography variant={ETextVariant.sm} medium className="break-all">
            {item?.key}
          </Typography>
        </div>
      </div>
      <div className="flex col-span-1 items-center justify-end">
        <div className="w-[120px] flex justify-center">
          <Typography
            variant={ETextVariant.sm}
            medium
            color={processedDocument?.accuracy === 100 ? ETextColor.black : ETextColor.error}
            className="mr-4 sm:uppercase"
            hidden={!processedDocument?.accuracy}
          >
            {`${processedDocument?.accuracy}% ${t('correct')}`}
          </Typography>
          {checked && disableAll && <Spinner size='xsmall'/>}
        </div>
      </div>
    </TableItem>
  );
};

export default AlgorithmAccuracyTableItem;
