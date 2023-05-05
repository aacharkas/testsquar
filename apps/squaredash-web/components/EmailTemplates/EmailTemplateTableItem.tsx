import { Ability, AbilityTuple, MongoQuery, Subject } from '@casl/ability';
import { AnyObject } from '@casl/ability/dist/types/types';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { getItemDropdowns } from './EmailTemplates.helper';
import { TDropdownItem, TTemplate } from './EmailTemplates.types';

interface IProps {
  item: TTemplate;
  size: number;
  onClickView?: (val: TDropdownItem, item?: TTemplate) => void;
  ability: Ability<AbilityTuple<string, Subject>, MongoQuery<AnyObject>>;
}

const EmailTemplateItem = ({ item, size, onClickView, ability }: IProps) => {
  const { t } = useTranslation(['buttons', 'email_templates']);
  const dropdownItems = getItemDropdowns(item.id, t);
  const subject = useMemo(() => {
    if (item?.companyEmailTemplate?.length > 0) {
      const customTemplate = item?.companyEmailTemplate[0];
      return customTemplate?.customSubject;
    }
    return item.defaultSubject;
  }, [item]);
  
  return (
    <TableItem
      dropdownItems={dropdownItems}
      columnsSize={size}
      columnsSizeTablet={2}
      onClickItem={(dropdownItem) => onClickView(dropdownItem, item)}
      ability={ability}
    >
      <div className="flex col-span-1 items-center">
        <div>
          <Typography variant={ETextVariant.sm} medium className="mr-4">
            {item.name}
          </Typography>
        </div>
      </div>
      <div className="flex items-center col-span-1 sm:mt-4">
        <div>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="hidden md:block sm:block"
          >
            {t('subject', { ns: 'email_templates'})}:
          </Typography>
          <Typography variant={ETextVariant.sm} medium className="mr-4">
            {subject}
          </Typography>
        </div>
      </div>
    </TableItem>
  );
};

export default EmailTemplateItem;
