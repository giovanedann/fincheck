// import { Outlet } from "react-router-dom";

import illustration from '../../assets/images/illustration.png'
import { Logo } from '../components'

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full flex items-center justify-center md:w-1/2">
        <Logo className="text-gray-500 h-6" />
      </div>

      <div className="w-1/2 h-full justify-center items-center relative p-2 xl:p-8 hidden md:flex">
        <img
          className="object-cover w-full h-full max-w-[656px] max-h-[850px] xl:max-h-[960px] select-none rounded-[2rem]"
          src={illustration}
          alt="Image of the user application with bank transactions"
        />

        <div className="w-full max-w-[656px] bottom-8 lg:bottom-4 bg-white p-10 lg:p-4 absolute rounded-b-[2rem]">
          <Logo className="text-teal-900 h-4 xl:h-8" />
          <p className="text-gray-700 font-medium text-md xl:text-xl text-start mt-6">
            Manage your bank transactions with ease, for free!
          </p>
        </div>
      </div>
    </div>
  )
}
