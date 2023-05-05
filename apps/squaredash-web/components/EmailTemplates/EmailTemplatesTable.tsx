import SlideModal from '../../../../libs/web/components/SlideModal/SlideModal';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { useAbility } from '../../lib/ability';
import EmailTemplateTableItem from './EmailTemplateTableItem';
import useEmailTemplatesData from './hooks/useEmailTemplatesData';
import EmailTemplatePreview from './EmailTemplatePreview';
import classNames from 'classnames';

const EmailTemplatesTable = () => {
  const { localActions, localState, handlers, formattedData, localErrorText } = useEmailTemplatesData();
  const ability = useAbility();
  const { t } = useTranslation('email_templates');
  const items = [t('template_name'), t('subject')];

  return (
    <>
      <div className="flex gap-2.5 mb-4">
        <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
          {t('email_templates')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          {formattedData.templatesData?.length && `(${formattedData?.templatesCount})`}
        </Typography>
      </div>
      <div 
        className={classNames(
          'shadow rounded-md relative',
          {
            'min-h-[300px]': !formattedData.templatesData?.length
          }
        )}
      >
        {formattedData.loading && <Spinner contentSize />}
        <TableHeader
          items={items}
          columnsSize={2}
          className="md:hidden sm:hidden"
        />
        {formattedData.templatesData?.length ? (
          <>
            <TableBody>
              {formattedData.templatesData.map((item) => (
                <EmailTemplateTableItem
                  key={item.id}
                  item={item}
                  size={2}
                  ability={ability}
                  onClickView={handlers.handleActionOnTableItem}
                />
              ))}
            </TableBody>
          </>
        ) : (
          <Typography
            variant={ETextVariant.base}
            color={ETextColor.gray}
            medium
            className="flex justify-center py-5 h-full"
          >
            {localErrorText('IM0025', 'email templates')}
          </Typography>
        )}
      </div>
      <SlideModal
        closeModal={() => localActions.setOpenPreviewModal(false)}
        isModalOpen={localState.openPreviewModal}
        dialogTitle={t('preview')}
        lgModal
        defaultPadding={false}
      >
        <EmailTemplatePreview
          item={formattedData.templateData}
          loading={formattedData.loadingGetPreview}
          handleAction={handlers.handleActionEdit}
        />
      </SlideModal>
    </>
  );
};

export default EmailTemplatesTable;
