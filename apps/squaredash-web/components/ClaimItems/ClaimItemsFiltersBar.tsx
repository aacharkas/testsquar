import {useTranslation} from 'next-i18next';
import React from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import Checkbox from '../../../../libs/web/components/Checkbox/Checkbox';

interface IProps {
  sourcesOptions: { id: number; name: string }[];
  selectedSource: { id: number; name: string };
  handleSourceFilters: (source) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const ClaimItemsFilterBars = ({
  sourcesOptions,
  selectedSource,
  handleSourceFilters,
  applyFilters,
  clearFilters,
}: IProps) => {
  const {t} = useTranslation('claim_items');

  return (
    <>
      <div className="border-b border-gray-100 py-5 px-6">
        <Typography variant={ETextVariant.lg} color={ETextColor.primary} medium>
          {t('filter')}
        </Typography>
      </div>
      <div className="my-2 mx-6">
        <div>
          <Typography variant={ETextVariant.base} medium>
            {t('source')}
          </Typography>
          {sourcesOptions.map((item) => {
            return (
              <Checkbox
                key={item.id}
                label={item.name}
                onChange={() => handleSourceFilters(item)}
                checked={selectedSource?.id === item?.id}
                className="my-5"
              />
            );
          })}
        </div>
        <div className="pt-4">
          <Button size="big" className="w-full mb-3" onClick={applyFilters}>
            {t('apply')}
          </Button>
          <Button
            size="big"
            theme="light"
            className="w-full"
            onClick={clearFilters}
          >
            {t('clear_filters')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ClaimItemsFilterBars;
