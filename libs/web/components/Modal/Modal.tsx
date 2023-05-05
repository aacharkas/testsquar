import {Dialog, Transition} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import React, {Fragment, useState} from 'react';

import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';

interface IProps {
  show?: boolean;
  loading?: boolean;
  children: React.ReactNode | string;
  closeModal: () => void;
  firstButtonAction?: () => void;
  secondButtonAction?: () => void;
  overrideClose?: boolean;
  firstButtonText: string;
  secondButtonText?: string;
  isDisabled?: boolean;
  fullScreenModal?: boolean;
}

const Modal = ({
                 show = true,
                 loading = false,
                 children,
                 closeModal,
                 firstButtonAction,
                 secondButtonAction,
                 firstButtonText,
                 secondButtonText,
                 isDisabled = false,
                 fullScreenModal = false,
                 overrideClose=false,
}: IProps) => {
  if (!show) return null;

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={overrideClose ? (firstButtonAction || closeModal) : closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className={fullScreenModal ? "flex min-h-full justify-center p-4 text-center items-center xs:items-end xs:p-0 xs:min-h-0" : "flex min-h-full justify-center p-4 text-center items-center sm:items-end"}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={fullScreenModal ? "max-w-lg relative transform overflow-hidden w-2/5 md:w-2/3 rounded-lg bg-white pb-4 text-left shadow-xl transition-all sm:my-0 sm:w-full sm:max-w-lg sm:p-4 sm:mb-0 xs:my-0 xs:w-full xs:max-w-full xs:p-4 xs:mb-0 xs:h-screen xs:rounded-none" : "max-w-xl relative transform overflow-hidden w-2/5 md:w-2/3 rounded-lg bg-white pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-4 sm:mb-0"}>
                {loading && <Spinner contentSize/>}
                <div className={fullScreenModal ? "px-6 pt-6 xs:px-0 xs:pt-0" : "px-6 pt-6"}>
                  <div
                    className={fullScreenModal ? "z-50 absolute top-0 right-0 pt-6 pr-6" : "z-50 absolute top-0 right-0 pt-6 pr-6 sm:hidden"}>
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={overrideClose ? (firstButtonAction || closeModal) : closeModal}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                  </div>
                  <div className="sm:text-center pr-6 sm:pr-0">{children}</div>
                  <div
                    className={fullScreenModal ? "xs:grid xs:grid-cols-2 xs:items-center xs:gap-3 xs:mt-6 sm:grid sm:grid-cols-2 sm:items-center sm:gap-3 sm:mt-6 mt-6 flex justify-end" : "mt-6 sm:mt-4 flex justify-end sm:flex-col"}>
                    {!!firstButtonText && (
                      <Button
                        theme="light"
                        size="big"
                        className={!fullScreenModal && "sm:mb-2"}
                        onClick={firstButtonAction || closeModal}
                        disabled={isDisabled}
                      >
                        {firstButtonText}
                      </Button>
                    )}
                    {!!secondButtonText && (
                      <Button
                        size="big"
                        onClick={secondButtonAction}
                        className="ml-4 sm:ml-0"
                        disabled={isDisabled}
                      >
                        {secondButtonText}
                      </Button>
                    )}

                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
