import {ArrowLeftIcon} from '@heroicons/react/20/solid';
import {useTranslation} from 'next-i18next';
import React from 'react';

import Modal from '../../../../../libs/web/components/Modal/Modal';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {ETextVariant} from '../../../../../libs/web/constants/enums';
import {ROUTES} from '../../../constants/routes';
import Link from '../../Link';
import LocationTable from '../../Location/LocationTable';
import ProfileGeneral from './ProfileGeneral';
import useCompanyData from './hooks/useCompanyData';
import {useCompaniesData} from '../hooks/useCompaniesData';

const CompanyProfile = () => {
  const {t} = useTranslation(['companies', 'system_errors']);
  const {
    state,
    localActions,
    formattedData,
    handlers,
    discardChanges,
    localErrorText,
  } = useCompanyData();

  return (
    <>
      <Typography
        variant={ETextVariant.xl}
        medium
        className="flex items-center"
      >
        {formattedData.isMoreDetailed && (
          <Link type="tab" href={`/${ROUTES.COMPANIES}`}>
            <ArrowLeftIcon
              className="h-6 w-6 text-gray-500 ml-2 mr-4"
              aria-hidden="true"
            />
          </Link>
        )}
        {t('profile')}
      </Typography>
      <ProfileGeneral
        loading={formattedData.loading}
        formattedData={formattedData}
        handlers={handlers}
        handleChangeStatus={handlers.handleChangeStatus}
        editMode={state.editMode}
        stateActions={localActions}
        localErrorText={localErrorText}
      />
      <LocationTable
        loading={formattedData.loading}
        company={formattedData.companyForm}
        handleAction={handlers.handleAction}
        localErrorText={localErrorText}
      />
      <Modal
        show={state.openModal}
        closeModal={handlers.handleCloseModal}
        secondButtonAction={discardChanges}
        firstButtonText={t('cancel')}
        secondButtonText={t('discard')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('IM0010', {ns: 'system_errors'})}
        </Typography>
      </Modal>
    </>
  );
};

export default CompanyProfile;
