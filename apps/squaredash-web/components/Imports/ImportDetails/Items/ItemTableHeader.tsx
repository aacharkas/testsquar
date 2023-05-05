import React from 'react';
import classNames from 'classnames';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';

interface IProps {
  items: string[];
}


const ItemTableHeader = ({
  items
}: IProps): JSX.Element => {
  return (
    <thead className='bg-gray-50 md:hidden sm:hidden'>
      <tr>
        <th className="px-3 py-4 text-right"/>
        {items?.map((item, index) =>
          <th
            key={index}
            scope="col"
            className={classNames(index ? 'text-right' : 'text-left', 'py-3.5 pl-4 pr-3')}
          >
            <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>
              {item}
            </Typography>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default ItemTableHeader;
