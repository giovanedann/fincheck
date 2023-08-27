import { ComponentProps } from "react"

type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 transition-all ease-in-out duration-300 disabled:cursor-not-allowed"
    />
  )
}
