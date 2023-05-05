import { Dialog, Transition } from '@headlessui/react';
import {
  ArrowSmallLeftIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';

interface IProps {
  value?: string;
  placeholder?: string;
  isDisabled?: boolean;
  active?: boolean;
  setActive(open: boolean): void;
  onChangeText?: (e) => void;
  children?: React.ReactNode;
}

export function MobileSearch({
  value,
  placeholder = '',
  isDisabled = false,
  active = false,
  setActive,
  onChangeText,
  children,
}: IProps) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setActive(false);
    }
  };

  return (
    <Transition.Root show={active} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 xl:hidden lg:hidden md:hidden sm:block"
        onClose={setActive}
      >
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-200 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full flex-1 flex-col bg-white pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="flex items-center border-b border-gray-100">
                  <div className="flex items-center justify-center h-full px-4 py-5 border-r border-gray-100">
                    <button
                      className="h-6 w-6 "
                      onClick={() => setActive(false)}
                    >
                      <ArrowSmallLeftIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="relative xmt-1 focus:border-inherit w-full h-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      name="search"
                      disabled={isDisabled}
                      value={value ?? ''}
                      onChange={(e) => onChangeText(e.target.value)}
                      className="block w-full pl-10 pr-10 border-none h-full focus:ring-inherit"
                      placeholder={placeholder}
                      onKeyDown={handleKeyPress}
                    />
                    {!!value && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <XCircleIcon
                          onClick={() => onChangeText('')}
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </Transition.Child>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default MobileSearch;
