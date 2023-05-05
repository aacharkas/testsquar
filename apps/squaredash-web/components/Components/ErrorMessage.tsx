import classNames from 'classnames';
import type { TFunction } from 'next-i18next';
import React, { ReactElement } from 'react';

import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';

interface IProps {
  formError: {
    common_issue?: boolean;
    common_text?: string;
  };
  t: TFunction;
  children?: ReactElement;
  className?: string;
  options?: { [x: string]: string };
}
export const ErrorMessage = ({
  formError,
  t,
  children,
  className,
  options = {},
}: IProps): ReactElement => {
  if (!formError?.common_issue) return null;
  return (
    <Typography
      variant={ETextVariant.sm}
      color={ETextColor.error}
      className={classNames('mt-5 mb-6 flex items-center', className)}
    >
      {children}
      {t(formError?.common_text, { ns: 'system_errors', ...options }) ||
        t('common', { ns: 'system_errors' })}
    </Typography>
  );
};

export const localIssueText = (text: string, t, options = {}): string =>
  t(text, { ns: 'system_errors', ...options });
