import classNames from 'classnames';
import React from 'react';

import styles from './Login.module.css';

interface IProps {
  children: React.ReactNode;
}

export function LoginWrapper({ children }: IProps) {
  return (
    <div className={classNames('flex', 'h-screen', styles['login-page'])}>
      <div className={classNames('flex justify-center', styles['login-main'])}>
        <div className="mb-auto mt-7 sm:w-80 w-96 sm:mt-[11%] md:mt-[15%] lg:mt-[20%] xl:mt-[25%] sm:pb-10 sm:w-full sm:px-4">
          {children}
        </div>
      </div>
      <div
        className={classNames(
          'relative bg-cover bg-no-repeat',
          styles['login-image']
        )}
      >
        <div
          className={classNames(
            'absolute bg-cover bg-no-repeat bg-center',
            styles['login-image-logo']
          )}
        ></div>
      </div>
    </div>
  );
}

export default LoginWrapper;
