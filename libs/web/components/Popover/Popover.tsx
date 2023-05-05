import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import classNames from 'classnames';

interface IProps {
  children: React.ReactNode | string;
  button: React.ReactNode | string;
  position?: string;
}

const PopoverPanel = ({
  button,
  children,
  position = 'top'
}: IProps) => {
  return (
    <Popover className="relative">
      <Popover.Button>{button}</Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className={classNames(
          'absolute md:right-0 z-10 w-screen max-w-2xl md:translate-x-1/4 -translate-x-1/2 transform px-4 sm:px-0',
          {
            'top-12': position === 'bottom',
            'bottom-12': position === 'top',
          }
        )}>
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative bg-white">
              {children}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
};

export default PopoverPanel;
