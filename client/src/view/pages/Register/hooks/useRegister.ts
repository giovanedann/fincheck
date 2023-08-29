import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().nonempty('E-mail is required').email('E-mail must be a valid e-mail format'),
  password: z.string().nonempty('Password is required').min(8, 'Password must have at least 8 characters'),
})

type RegisterFormData = z.infer<typeof schema>

export function useRegister() {
  const {
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    register
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema)
  })

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log('calling api with:', { data })
  })

  return { handleSubmit, register, errors }
}
