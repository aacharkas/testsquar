import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

interface IProps {
  show?: boolean;
  children: React.ReactNode | string;
  closeMessage: () => void;
  top?:boolean;
}

const Message = ({ show = true, children, closeMessage,top=false }: IProps) => {
  if (!show) return null;

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className={top?"relative z-[3000]":"relative z-10"} onClose={closeMessage}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex p-4 text-center justify-end mt-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="max-w-xl relative transform overflow-hidden w-96 rounded-lg bg-white p-4 text-left shadow-xl transition-all">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={closeMessage}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Message;
