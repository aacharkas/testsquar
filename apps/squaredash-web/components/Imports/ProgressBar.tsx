import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextVariant} from '../../../../libs/web/constants/enums';
import {CIRCUMFERENCE} from './Imports.constants';

interface IProps {
  t: any;
  currentPercent: number;
}

const ProgressBar = ({t, currentPercent}: IProps) => {
  return (
    <div className='flex items-center'>
      <div x-data="skillDisplay" className='relative w-16 h-16 mr-1'>
        <svg className="transform -rotate-90 w-16 h-16 flex items-center">
          <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="5" fill="transparent"
            className="text-indigo-100"/>

          <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="5" fill="transparent"
            className="text-indigo-800"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE - currentPercent / 100 * CIRCUMFERENCE}
          />
        </svg>
        <Typography variant={ETextVariant.sm} medium
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">{currentPercent}%</Typography>
      </div>
      <Typography variant={ETextVariant.sm} medium>{t('to_complete')}...</Typography>
    </div>
  );
};

export default ProgressBar;
