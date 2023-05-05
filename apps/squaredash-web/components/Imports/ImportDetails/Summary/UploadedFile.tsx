import React, {useMemo} from 'react';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';
import {DocumentTextIcon} from '@heroicons/react/24/outline';
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import DropdownItem from '../../../../../../libs/web/components/Dropdown/DropdownItem';
import Dropdown from '../../../../../../libs/web/components/Dropdown/Dropdown';
import {getItemDropdowns} from '../ImportDetails.helper';
import {TDropdownFileItem, TImportDetailsData} from '../ImportDetails.types';
import {IMPORT_DETAILS_FIELDS} from '../ImportDetails.constants';

interface IProps {
  t: any,
  data: TImportDetailsData,
  onClickFileItem?: (item: TDropdownFileItem) => void;
}


const UploadedFile = ({
  t,
  data,
  onClickFileItem,
}: IProps): JSX.Element => {
  const dropdownItems = useMemo(
    () => getItemDropdowns({t}),
    [data, t]
  );

  return (
    <>
      <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>
        {t('uploaded_file')}
      </Typography>
      <div
        className='flex items-center justify-between mt-1 bg-gray-100 w-[278px] h-[64px] rounded-md border border-gray-300 px-2'>
        <div className='flex items-center'>
          <DocumentTextIcon className="h-6 w-6 text-gray-500 mr-2"/>
          <div>
            <Typography
              variant={ETextVariant.sm}
              medium
            >
              {data[IMPORT_DETAILS_FIELDS.INITIAL_DOCUMENT_NAME] as string}
            </Typography>
          </div>
        </div>
        <Dropdown
          mobileDisplayType='dropdown'
          button={
            <EllipsisVerticalIcon
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          }
        >
          {dropdownItems?.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                onClick={() => onClickFileItem(item)}
              >
                <Typography
                  variant={ETextVariant.sm}
                  color={ETextColor.gray}
                  medium
                >
                  {item.title}
                </Typography>
              </DropdownItem>
            );
          })}
        </Dropdown>
      </div>
    </>
  );
};

export default UploadedFile;
