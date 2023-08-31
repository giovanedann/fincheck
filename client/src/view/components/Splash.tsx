import { Transition } from '@headlessui/react';
import { Logo } from '.';
import { Spinner } from './Spinner';

type SplashProps = {
  show: boolean;
}

export function Splash({ show }: SplashProps) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-teal-900 fixed w-full h-full inset-0 flex items-center justify-center">
        <div className="flex flex-col gap-6 w-fit h-fit items-center justify-center">
          <Logo className="text-white h-10" />
          <Spinner className="text-teal-900 fill-white w-10 h-10" />
        </div>
      </div>
    </Transition>
  )
}
