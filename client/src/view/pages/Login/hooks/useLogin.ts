import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormData = {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8)
})

export function useLogin() {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm<LoginFormData>()

  const handleSubmit = hookFormHandleSubmit((data) => {
    const isDataValid = schema.safeParse(data)
    console.log({ isDataValid })
  })

  return { handleSubmit, register }
}
