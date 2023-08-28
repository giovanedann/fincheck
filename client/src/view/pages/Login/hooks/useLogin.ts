import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string
  password: string
}

export function useLogin() {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm<LoginFormData>()

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({ data })
  })

  return { handleSubmit, register }
}
