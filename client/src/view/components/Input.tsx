import { ComponentProps, forwardRef } from 'react'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { cn } from 'app/utils';

type InputProps = ComponentProps<'input'> & {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          placeholder=" "
          className={
            cn(
              'bg-white w-full rounded-lg border pt-4 placeholder-shown:pt-0 border-gray-500 focus:border-gray-800 px-3 h-[52px] text-gray-800 peer transition-all ease-in-out duration-300 outline-none',
              error && '!border-red-900',
              className
            )
          }
        />

        <label
          htmlFor={inputId}
          className="absolute text-xs peer-placeholder-shown:text-base left-[13px] top-2 peer-placeholder-shown:top-3.5 pointer-events-none text-gray-700 transition-all ease-in-out duration-300"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-sm">
              {error}
            </span>
          </div>
        )}
      </div>
    )
  });

Input.displayName = 'Input'
