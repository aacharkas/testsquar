import classNames from 'classnames';

import { avatarHelper } from './avatar.helper';

interface IProps {
  image?: string;
  initials?: string;
  size?: 'big' | 'medium' | 'small' | 'huge';
  shape?: 'circle' | 'square';
}

export function Avatar({
  image,
  initials,
  size = 'big',
  shape = 'circle',
}: IProps) {
  const styles = avatarHelper(size, shape);
  return (
    <>
      {image ? (
        <img
          className={classNames(
            'inline-block object-cover',
            styles.sizeStyle,
            styles.shapeStyle
          )}
          src={image}
          alt="image"
        />
      ) : (
        <span
          className={classNames(
            'inline-flex items-center justify-center bg-gray-500',
            styles.sizeStyle,
            styles.shapeStyle
          )}
        >
          <span className="inline-flex items-center text-white justify-center bg-gray-500">
            {initials}
          </span>
        </span>
      )}
    </>
  );
}

export default Avatar;
