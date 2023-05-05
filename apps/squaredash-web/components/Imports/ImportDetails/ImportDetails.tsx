import {useTranslation} from 'next-i18next';
import Button from '../../../../../libs/web/components/Button/Button';
import classNames from 'classnames';
import React from 'react';
import {DocumentTextIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import {Tabs} from '../../../../../libs/web/components/Tabs/Tabs';
import useImportDetailsData from './hooks/useImportDetailsData';
import Summary from './Summary/Summary';
import Total from './Total/Total';
import Items from './Items/Items';
import {IMPORT_DETAILS_FIELDS} from './ImportDetails.constants';
import PdfReader from './Pdf/PdfReader';
import PdfPage from './Pdf/PdfPage';
import ImportDetailsHeader from './ImportDetailsHeader';
import Alert from '../../../../../libs/web/components/Alert/Alert';
import Modal from '../../../../../libs/web/components/Modal/Modal';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../../libs/web/constants/enums';

const ImportDetails = () => {
  const {
    localState,
    localActions,
    formattedData,
    handlers,
    onClickFileItem,
    localErrorText,
  } = useImportDetailsData();
  const {t} = useTranslation(['imports', 'system_errors']);
  const importDetailsTabs = [
    {
      id: 'summary',
      name: t('summary'),
      children: (
        <Summary
          formattedData={formattedData}
          isVerified={localState.isVerified}
          onClickFileItem={onClickFileItem}
          handlers={handlers}
          setImportCustomerData={localActions.setImportCustomerData}
          localState={localState}
          localActions={localActions}
          localErrorText={localErrorText}
          isOpenCustomer={localState.openCustomerCreateModal}
          setOpenCustomer={localActions.setOpenCustomerCreateModal}
          verifyOnActionSuccess={localState.verifyOnActionSuccess}
        />
      ),
    },
    {
      id: 'items',
      name: t('items'),
      children: (
        <Items
          data={formattedData.importDetailsData}
          isVerified={localState.isVerified}
          editItem={localState.editItem}
          setEditItem={localActions.setEditItem}
          validationData={formattedData.validationData}
        />
      ),
    },
    {
      id: 'total',
      name: t('total'),
      children: (
        <Total
          data={formattedData.importDetailsData}
          validationData={formattedData.validationData}
          onChange={handlers.handleChangeGeneralData}
          loading={formattedData.generalFieldsLoading}
          isVerified={localState.isVerified}
          editItem={localState.editItem}
          setEditItem={localActions.setEditItem}
        />
      ),
    },
  ];

  return (
    <>
      {localState.openPdfPage ?
        <PdfPage
          t={t}
          data={formattedData.importDetailsData}
          onClose={() => localActions.setOpenPdfPage(false)}
        /> :
        <>
          <ImportDetailsHeader isVerified={localState.isVerified} handleVerifyImport={handlers.handleVerifyImport} />
          <div className='flex md:block sm:block'>
            {localState.pdfVisible && !localState.isVerified &&
              <PdfReader
                url={formattedData.importDetailsData[IMPORT_DETAILS_FIELDS.INITIAL_DOCUMENT_LINK] as string}
                id={formattedData.importDetailsData[IMPORT_DETAILS_FIELDS.INITIAL_DOCUMENT_ID] as string}
                name={formattedData.importDetailsData[IMPORT_DETAILS_FIELDS.INITIAL_DOCUMENT_NAME] as string}
              />
            }
            <div className='relative flex-1'>
              <Button
                icon
                className={classNames(
                  'w-10 h-10 absolute top-2 z-[5] sm:hidden',
                  {
                    'outline-none ring-2 ring-offset-2 ring-indigo-700': localState.pdfVisible,
                    'hidden': localState.isVerified
                  },
                )}
                onClick={() => localActions.setPdfVisible(!localState.pdfVisible)}
              >
                <DocumentTextIcon className='w-5 h-5 text-gray-500'/>
              </Button>
              <Tabs
                disableSmall
                currentTab={localState.currentTab}
                changeTab={(tab) => localActions.setCurrentTab(tab)}
                tabs={importDetailsTabs}
                loading={formattedData.loading}
                isPadding={!localState.isVerified}
              />
            </div>
          </div>
          <Alert
            show={localState.openVerifyErrorModal}
            closeModal={() => localActions.setOpenVerifyErrorModal(false)}
            title={t('cant_verify_import')}
            message={t('IM0075', {
              ns: 'system_errors',
            })}
            buttonText={t('ok')}
          />
          <Modal
            show={!!localState.customerMismatchFields?.length}
            closeModal={() => localActions.setCustomerMismatchFields([])}
            firstButtonAction={handlers.handleUpdateExistingCustomer}
            secondButtonAction={handlers.handleUpdateScopeCustomer}
            firstButtonText={t('update_data')}
            secondButtonText={t('use_saved_data')}
            loading={formattedData.loadingCustomerMismatch}
          >
            <div className="flex gap-6">
              <div className="w-1/12">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
              </div>
              <div className="w-11/12">
                <Typography variant={ETextVariant.lg} medium>
                  {t('cant_verify_import')}
                </Typography>
                <Typography variant={ETextVariant.sm} color={ETextColor.gray} className="mt-2">
                  {t('IM0070', {
                    ns: 'system_errors',
                    customer: formattedData?.importCustomerData?.[IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME],
                    fields: localState.customerMismatchFields.map(field => t(field.localeKey)).join(', '),
                  })}
                </Typography>
              </div>
            </div>
          </Modal>
        </>
      }
    </>
  );
};

export default ImportDetails;
