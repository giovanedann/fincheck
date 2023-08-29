import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import AuthService from "../../../../app/infra/services/AuthService";
import { SignUpParams } from "../../../../app/domain/services/AuthService";
import { toast } from "react-hot-toast";

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

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: SignUpParams) => {
      return AuthService.signUp(data)
    }
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

      console.log({ accessToken })
    } catch {
      toast.error('Something got wrong')
    }
  })

  return {
    handleSubmit,
    register,
    errors,
    isLoading
  }
}
