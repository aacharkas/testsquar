import { PencilIcon } from '@heroicons/react/24/outline';
import Button from '../../../../libs/web/components/Button/Button';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';

import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { Can } from '../../lib/ability';
import { PERMISSIONS, PERMISSION_ACTIONS } from '../../../../apps/squaredash-web/constants/permissions';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import { TTemplateForm } from './EmailTemplate/EmailTemplateForm.types';

interface IProps {
  item: TTemplateForm;
  loading?: boolean;
  handleAction: (id: string) => void;
}

const EmailTemplatePreview = ({ item, handleAction, loading }: IProps) => {
  const { t } = useTranslation(['buttons', 'email_templates']);
  const previewRef = useRef(null);
  const [action, setAction] = useState(null);

  useEffect(() => { 
    if (item) {
      const previewBody = item.html?.slice(item.html.indexOf('<body>'), item.html.indexOf('</body>') + 7);
      previewRef.current.innerHTML = previewBody || '';
    }
  }, [previewRef, item]);

  useEffect(() => {
    if (action) {
      handleAction(item?.id);
    }
  }, [action]);

  return (
    <>
      {loading && <Spinner contentSize />}
      <div className="px-4">
        <div className="flex justify-between items-center">
          <div className="items-center">
            <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
              {t('template_name', { ns: 'email_templates' })}
            </Typography>
            <Typography variant={ETextVariant.sm}>{item.name || '-'}</Typography>
          </div>
          <Can I={PERMISSION_ACTIONS.UPDATE} a={PERMISSIONS.EMAIL_TEMPLATES}>
            <Button className="text-gray-500" icon onClick={() => setAction(item?.id)}>
              <PencilIcon className="h-5 w-5" />
            </Button>
          </Can>
        </div>
        <div className="items-center mt-4">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('subject', { ns: 'email_templates' })}
          </Typography>
          <Typography variant={ETextVariant.sm}>
            {item.subject || '-'}
          </Typography>
        </div>
      </div>
      {item && <div className="mt-8" ref={previewRef} onClick={(e) => e.preventDefault()} />}
    </>
  );
};

export default EmailTemplatePreview;
