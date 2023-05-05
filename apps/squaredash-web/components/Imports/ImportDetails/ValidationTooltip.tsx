import React, {useMemo} from 'react';
import Tooltip from '../../../../../libs/web/components/Tooltip/Tooltip';
import {localIssueText} from '../../Components/ErrorMessage';
import {useTranslation} from 'react-i18next';
import {getActionButtons} from './ValidationTooltip.helper';
import {TValidationDataItem} from './ImportDetails.types';
import {ETooltipType} from '../../../../../libs/web/constants/enums';

interface IProps {
  field: string;
  validationData: TValidationDataItem[];
  id?: string;
  messageProps?: any;
  hidden?: boolean;
  actions?: {
    firstButtonAction?: () => void;
    secondButtonAction?: (value) => void;
  };
}

const ValidationTooltip = ({
  field,
  validationData,
  id,
  messageProps,
  hidden = false,
  actions,
}: IProps) => {
  const {t} = useTranslation(['system_errors', 'buttons']);
  const validationField = useMemo(() => {
    if (id) {
      return validationData?.find(item => item.property === field && item.id === id);
    }
    return validationData?.find(item => item.property === field);
  }, [id, field, validationData]);
  const actionButtons = getActionButtons(validationField?.code, t);

  if (!validationField || hidden) return null;

  return (
    <>
      <Tooltip
        type={ETooltipType[validationField.type]}
        message={localIssueText(validationField.code, t, messageProps)}
        firstButtonText={actionButtons?.firstActionButton}
        secondButtonText={actionButtons?.secondActionButton}
        firstButtonAction={actions?.firstButtonAction}
        secondButtonAction={actions?.secondButtonAction}
        data={messageProps}
      />
    </>
  );
};

export default ValidationTooltip;
