import { useTranslation } from 'next-i18next';
import React from 'react';

import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import AlgorithmAccuracyTableItem from './AlgorithmAccuracyTableItem';
import useEmailTemplatesData from './hooks/useAlgorithmAccuracyData';
import classNames from 'classnames';
import Button from '../../../../libs/web/components/Button/Button';

const AlgorithmAccuracyTable = () => {
  const { localActions, localState, handlers, formattedData, localErrorText } = useEmailTemplatesData();
  const { t } = useTranslation('algorithm_accuracy');
  // console.log('formattedData', formattedData);
  return (
    <>
      <div className="flex flex-col sm:p-4">
        <div className="flex justify-between mb-4">
          <Typography variant={ETextVariant.xl} medium uppercase>
            {t('check_algorithm')}
          </Typography>
          <Button onClick={handlers.handleStartChecking}>
            <Typography variant={ETextVariant.base}>
              {t('start_checking')}
            </Typography>
          </Button>
        </div>
        <Typography variant={ETextVariant.base}>
          {t('algorithm_accuracy_description')}
        </Typography>
        <div className="flex justify-between items-center pr-16 md:pr-5 sm:pr-5">
          <Typography
            variant={ETextVariant.base}
            className="font-bold text-indigo-800 hover:text-indigo-500 focus:text-indigo-500 cursor-pointer my-4"
            onClick={handlers.handleChangeAll}
          >
            {formattedData?.allSelected ? t('clear_selection') : t('select_all')}
          </Typography>
          <Typography
            variant={ETextVariant.base}
            color={ETextColor.gray}
            hidden={!formattedData?.averageCorrect}
          >
            {t('average_correct', {percentage: formattedData?.averageCorrect?.accuracy})}
          </Typography>
        </div>
      </div>
      <div
        className={classNames(
          'shadow rounded-md relative',
          {
            'min-h-[300px]': !formattedData.algorithmAccuracyData?.length
          }
        )}
      >
        {formattedData.loading && <Spinner contentSize />}
        {formattedData.algorithmAccuracyData?.length ? (
          <>
            <TableBody>
              {formattedData.algorithmAccuracyData.map((item) => (
                <AlgorithmAccuracyTableItem
                  key={item.key}
                  item={item}
                  size={2}
                  disableAll={localState?.disableAll}
                  selectedDocuments={localState?.selectedDocuments}
                  onClickItem={handlers.handleChangeSelectedDocuments}
                  processedDocument={formattedData?.processedDocuments.find(doc => doc?.name === item?.key)}
                />
              ))}
            </TableBody>
          </>
        ) : (
          <Typography
            variant={ETextVariant.base}
            color={ETextColor.gray}
            medium
            className="flex justify-center py-5"
          >
            {localErrorText('IM0025', 'documents')}
          </Typography>
        )}
      </div>
    </>
  );
};

export default AlgorithmAccuracyTable;
