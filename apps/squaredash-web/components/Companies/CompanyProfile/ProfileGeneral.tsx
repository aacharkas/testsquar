import {useTranslation} from 'next-i18next';
import React, {useMemo} from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {ETextVariant} from '../../../../../libs/web/constants/enums';
import {
  TCompanyDataAction,
  TCompanyDataFormattedDataUpdated,
  TCompanyDataHandlers, TCompanyFormDefault,
} from './CompanyProfile.types';
import ProfileGeneralInfo from './ProfileGeneralInfo';
import ProfileGeneralInfoEditMode from './ProfileGeneralInfoEditMode';
import {getCompanyStatusButton} from '../Companies.helper';

interface IProps {
  loading: boolean;
  editMode: boolean;
  formattedData: TCompanyDataFormattedDataUpdated;
  stateActions: TCompanyDataAction;
  handlers: TCompanyDataHandlers;
  handleChangeStatus: (item: TCompanyFormDefault) => void;
  localErrorText: (text: string, field: string) => string;
}

const ProfileGeneral = ({
  loading,
  editMode,
  formattedData,
  stateActions,
  handlers,
  handleChangeStatus,
  localErrorText,
}: IProps) => {
  const {t} = useTranslation('companies');
  const statusButton = useMemo(() =>
    getCompanyStatusButton(formattedData.companyForm, t),
  [formattedData.companyForm]);

  return (
    <div className="relative">
      {loading && <Spinner contentSize/>}
      <section className="p-6 my-4 bg-white rounded-lg shadow-sm sm:p-4 sm:rounded-none">
        <div className="flex justify-between items-center sm:flex-col sm:items-start">
          <Typography variant={ETextVariant.lg} medium className="pb-2">
            {t('general_info')}
          </Typography>
          <div>
            {formattedData.isMoreDetailed && !editMode && (
              <>
                <Button
                  theme="light"
                  size="big"
                  onClick={() => handleChangeStatus(formattedData.companyForm)}
                  className="sm:my-2 mr-4"
                >
                  {statusButton}
                </Button>
                <Button
                  size="big"
                  onClick={() => stateActions.setEditMode(true)}
                  className="sm:my-2"
                >
                  {t('edit')}
                </Button>
              </>
            )}
          </div>
        </div>
        {editMode ? (
          <ProfileGeneralInfoEditMode
            formattedData={formattedData}
            stateActions={stateActions}
            handlers={handlers}
            localErrorText={localErrorText}
          />
        ) : (
          <ProfileGeneralInfo
            company={formattedData.companyForm}
            isMoreDetailed={formattedData.isMoreDetailed}
            setEditMode={stateActions.setEditMode}
          />
        )}
      </section>
    </div>
  );
};

export default ProfileGeneral;
