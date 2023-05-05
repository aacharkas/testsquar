import {
  flip,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment, useMemo, useState } from 'react';

import { ETextColor, ETextVariant } from '../../constants/enums';
import Typography from '../Typography/Typography';
import DropdownItem from './DropdownItem';

interface IProps {
  button: React.ReactNode;
  children: React.ReactNode | string;
  className?: string;
  mobileDisplayType?: 'bottom-list' | 'dropdown';
}

export function Dropdown({
  button,
  children,
  className,
  mobileDisplayType = 'bottom-list',
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    placement: 'bottom-end',
    middleware: [flip()],
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);
  const mobileDisplayBottom = useMemo(
    () => mobileDisplayType == 'bottom-list',
    [mobileDisplayType]
  );

  return (
    <div className="relative inline-block text-left">
      {isOpen && mobileDisplayBottom && (
        <div className="hidden sm:fixed h-full w-full bg-zinc-500/80 sm:block top-0 left-0 z-10" />
      )}
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={classNames(
          'h-10 w-10 hover:bg-gray-50 flex items-center justify-center rounded-full',
          isOpen && 'outline-none ring-2 ring-offset-2 ring-indigo-700'
        )}
      >
        {button}
      </div>
      <Transition
        as={Fragment}
        show={isOpen}
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          ref={refs.setFloating}
          style={{
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
          className={classNames(
            className,
            'absolute w-max',
            {
              'sm:fixed sm:w-[90%] sm:!top-auto sm:!bottom-3 sm:!left-[5%]':
                mobileDisplayBottom,
            },
            'flex flex-col z-10 w-32 overflow-hidden origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          )}
        >
          {children}
          {mobileDisplayBottom && (
            <DropdownItem
              onClick={() => setIsOpen(false)}
              className="border-t border-gray-400/20 hidden sm:block w-full"
            >
              <Typography
                variant={ETextVariant.sm}
                color={ETextColor.gray}
                className="text-left"
                medium
              >
                Cancel
              </Typography>
            </DropdownItem>
          )}
        </div>
      </Transition>
    </div>
  );
}

export default Dropdown;
