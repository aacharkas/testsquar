import React from 'react';
import styles from './Tooltip.module.css';
import classNames from 'classnames';
import {ExclamationTriangleIcon} from '@heroicons/react/24/solid';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import Typography from '../Typography/Typography';
import {ETextVariant, ETooltipType} from '../../../../libs/web/constants/enums';
import Button from '../Button/Button';

interface IProps {
  type: ETooltipType
  message?: string;
  firstButtonText?: string;
  secondButtonText?: string;
  firstButtonAction: () => void;
  secondButtonAction: (value) => void;
  data?: {
    attribute: string;
    attributeName: string;
    attributeValue: string;
  };
}

export function Tooltip({
                          message,
                          type,
                          firstButtonText,
                          secondButtonText,
                          firstButtonAction,
                          secondButtonAction,
                          data,
                        }: IProps) {
  return (
    <div className="flex flex-col items-start pl-2 sm:hidden" onClick={(e) => e.stopPropagation()}>
      <div className="flex-col md:flex-row flex items-center md:justify-center">
        <a
          className={classNames(
            'relative',
            styles['tooltip']
          )}
        >
          <div className="cursor-pointer">
            {type === ETooltipType.error ?
              <ExclamationCircleIcon className="h-4 w-5 text-red-500"/> :
              <ExclamationTriangleIcon className="h-4 w-4 text-yellow-400"/>}
          </div>
          <div
            className={classNames(
              'z-20 -ml-8 mt-2 w-fit min-w-[16rem] absolute transition duration-150 ease-in-out left-0 shadow-lg bg-gray-500 p-4 rounded-md hidden',
              styles['tooltip-item']
            )}
          >
            <svg className="absolute ml-4 -mt-2 top-0" width="20" height="15" viewBox="0 0 20 15" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.35178 1.39804C9.14645 0.241846 10.8535 0.241845 11.6482 1.39803L18.672 11.6171C19.5841 12.9442 18.6341 14.75 17.0238 14.75H2.97618C1.36594 14.75 0.415873 12.9442 1.32796 11.6171L8.35178 1.39804Z"
                fill="#6B7280"/>
            </svg>
            <Typography variant={ETextVariant.xs} className="text-white text-left">
              {message}
            </Typography>
            <div
              className={classNames(
                'flex gap-4 mt-4 justify-end',
                {
                  'justify-between': firstButtonText,
                  'hidden': !firstButtonText && !secondButtonText,
                }
              )}
            >
              {firstButtonText &&
                <Button
                  theme="light"
                  className="bg-white w-max"
                  children={firstButtonText}
                  onClick={firstButtonAction}
                />
              }
              {secondButtonText &&
                <Button
                  className="w-max focus:ring-0"
                  children={secondButtonText}
                  onClick={() => secondButtonAction(data)}
                />
              }
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Tooltip;
