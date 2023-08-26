// import { Outlet } from "react-router-dom";

import illustration from '../../assets/images/illustration.png'
import { Logo } from '../components'

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-full"></div>

      <div className="w-1/2 h-full flex justify-center items-center p-8 relative">
        <img
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[2rem]"
          src={illustration}
          alt="Image of the user application with bank transactions"
        />

        <div className="w-full max-w-[656px] bottom-0 bg-white p-10 absolute rounded-b-[2rem]">
          <Logo className="text-teal-900" />
          <p className="text-gray-700 font-medium text-xl text-start mt-6">
            Manage your bank transactions with ease, for free!
          </p>
        </div>
      </div>
    </div>
  )
}
