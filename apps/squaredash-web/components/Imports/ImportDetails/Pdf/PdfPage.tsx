import React from 'react';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import Button from '../../../../../../libs/web/components/Button/Button';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {TImportDetailsData} from '../ImportDetails.types';
import {IMPORT_DETAILS_FIELDS} from '../ImportDetails.constants';
import PdfReader from './PdfReader';

interface IProps {
  t: any,
  data: TImportDetailsData,
  onClose: () => void;
}


const PdfPage = ({
  t,
  data,
  onClose,
}: IProps): JSX.Element => {

  return (
    <>
      <Typography
        variant={ETextVariant.xl}
        medium
        className="flex items-center"
      >
        <Button
          icon
          onClick={onClose}
          className='w-10 h-10 mr-2'
        >
          <XMarkIcon
            className="h-10 w-10 text-gray-500"
            aria-hidden="true"
          />
        </Button>
        {t('view_pdf')}
      </Typography>
      <PdfReader
        url={data[IMPORT_DETAILS_FIELDS.INITIAL_DOCUMENT_LINK] as string}
        id={data[IMPORT_DETAILS_FIELDS.INITIAL_DOCUMENT_ID] as string}
        name={data[IMPORT_DETAILS_FIELDS.INITIAL_DOCUMENT_NAME] as string}
        isFullScreen
      />
    </>
  );
};

export default PdfPage;
