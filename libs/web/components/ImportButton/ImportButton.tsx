import React from "react";
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';
import {ETextVariant} from '../../../../libs/web/constants/enums';

interface IProps {
  buttonTitle: string;
  handleFile: (val) => void;
  supportedTypes: string[];
}

export function ImportButton({buttonTitle = "Import", handleFile, supportedTypes}: IProps) {
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <Button size="small" onClick={handleClick}>
        <ArrowDownTrayIcon className="h-6 w-6 mr-2"/>
        <Typography variant={ETextVariant.base} medium>
          {buttonTitle}
        </Typography>
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFile}
        accept={supportedTypes.join(', ')}
        style={{display: 'none'}}/>
    </>
  );
};
export default ImportButton;
