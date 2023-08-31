import { Outlet } from 'react-router-dom';

import illustration from '../../assets/images/illustration.png'
import { Logo } from 'view/components'

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full flex flex-col gap-16 items-center justify-center lg:w-1/2">
        <Logo className="text-gray-500 h-6" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full justify-center items-center relative p-8 hidden lg:flex">
        <img
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[2rem]"
          src={illustration}
          alt="Image of the user application with bank transactions"
        />

        <div className="max-w-[656px] bottom-8 mx-8 bg-white p-10 absolute rounded-b-[2rem]">
          <Logo className="text-teal-900 h-4 xl:h-8" />
          <p className="text-gray-700 font-medium text-md xl:text-xl text-start mt-6">
            Manage your personal finances with ease in Fincheck, and the best thing is: it's free!
          </p>
        </div>
      </div>
    </div>
  )
}
