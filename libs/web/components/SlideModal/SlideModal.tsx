import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { Fragment } from 'react';

import Spinner from '../Spinner/Spinner';

interface IProps {
  children: React.ReactNode | string;
  closeModal: (boolean) => void;
  isModalOpen: boolean;
  dialogTitle: string;
  loading?: boolean;
  lgModal?: boolean;
  defaultPadding?: boolean;
}

const SlideModal = ({
  children,
  closeModal,
  isModalOpen,
  dialogTitle,
  loading = false,
  lgModal = false,
  defaultPadding = true,
}: IProps) => {
  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel 
                  className={classNames('pointer-events-auto relative w-screen', {
                  'max-w-xl': lgModal,
                  'max-w-md': !lgModal,
                  })}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {loading && <Spinner contentSize />}
                    <div className="px-4 sm:px-6 border-b border-gray-100 my-4 pb-4">
                      <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                        {dialogTitle}
                      </Dialog.Title>
                    </div>
                    <div 
                      className={classNames('relative mt-1 flex-1', {
                        'px-4 sm:px-6': defaultPadding,
                      })}
                    >
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideModal;
