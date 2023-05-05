import React, {useEffect} from 'react';
import ViewSDKClient from '../../../../lib/ViewSDKClient';
import classNames from 'classnames';

interface IProps {
  url: string;
  id: string;
  name: string;
  isFullScreen?: boolean;
}

const RenderMenu = ({url, id, name, isFullScreen = false}: IProps) => {
  const loadPDF = () => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile(
        'pdf-div',
        {
          embedMode: 'FULL_WINDOW',
          showAnnotationTools: false,
          showBookmarks: false,
          showPageControls: true,
          showFullScreen: true,
        },
        url,
        id,
        name,
      );
    });
  };

  useEffect(() => {
    loadPDF();
  }, [id, url]);

  return (
    <div
      className={classNames('mt-2 rounded-md', isFullScreen ? 'h-screen' : 'mr-3 md:mr-0 sm:mr-0 md:h-[336px] sm:h-[336px] min-w-[440px] sm:hidden')}>
      <div
        id="pdf-div"
        className={classNames('full-window-div border border-gray-100 rounded-md shadow', !isFullScreen && 'md:max-h-[336px] sm:max-h-[336px]')}
      ></div>
    </div>
  );
};

export default RenderMenu;
