import { ComponentProps } from "react"

type InputProps = ComponentProps<'input'> & {
  name: string;
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
  const inputId = id ?? name

  return (
    <div className="relative">
      <input
        {...props}
        name={name}
        id={inputId}
        className="bg-white w-full rounded-lg border pt-4 placeholder-shown:pt-0 border-gray-500 focus:border-gray-800 px-3 h-[52px] text-gray-800 peer transition-all ease-in-out duration-300 outline-none"
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs peer-placeholder-shown:text-base left-[13px] top-2 peer-placeholder-shown:top-3.5 pointer-events-none text-gray-700 transition-all ease-in-out duration-300"
      >
        {placeholder}
      </label>
    </div>
  )
}
