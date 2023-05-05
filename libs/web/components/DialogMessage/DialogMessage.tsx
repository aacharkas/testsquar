import {flip, offset, useFloating, useFocus, useHover, useInteractions,} from '@floating-ui/react';
import {Transition} from '@headlessui/react';
import classNames from 'classnames';
import React, {Fragment, useState} from 'react';

import {ETextColor, ETextVariant} from '../../constants/enums';
import Typography from '../Typography/Typography';


interface IProps {
  children: React.ReactNode | string;
  className?: string;
  text: string;
}

export function DialogMessage({
                                children,
                                className,
                                text
                              }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {x, y, strategy, refs, context} = useFloating({
    placement: 'top-end',
    middleware: [flip(), offset(12)],
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const hover = useHover(context);
  const focus = useFocus(context);
  const {getReferenceProps, getFloatingProps} = useInteractions([
    hover,
    focus,
  ]);

  return (
    <div className="relative inline-block">
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={classNames(
          isOpen && 'outline-none'
        )}
      >
        {children}
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
            'flex flex-col z-10 w-32 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            'p-4 sm:p-2 bg-gray-500'
          )}
        >
          <Typography variant={ETextVariant.xs} color={ETextColor.white}>
            {text}
          </Typography>
          <div
            className='z-20 absolute w-3 h-3 bg-transparent -bottom-3 right-4 xs:right-0 xs:left-4 text-gray-500 border-t-[16px] border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent'/>
        </div>
      </Transition>
    </div>
  );
}

export default DialogMessage;
