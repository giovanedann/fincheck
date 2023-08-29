import { ComponentProps } from "react"
import { cn } from "../../app/utils/cn"
import { Spinner } from "./Spinner";

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean;
}

export function Button({ className, isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled ?? isLoading}
      className={
        cn(
          'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 transition-all ease-in-out duration-300 disabled:cursor-not-allowed flex items-center justify-center',
          className
        )
      }
    >
      {isLoading && <Spinner className="w-6 h-6" />}
      {!isLoading && children}
    </button>
  )
}
