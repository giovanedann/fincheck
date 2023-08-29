import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import AuthService from "../../../../app/infra/services/AuthService";
import { SignInParams } from "../../../../app/domain/services/AuthService";

const schema = z.object({
  email: z.string().nonempty('E-mail is required').email('E-mail must be a valid e-mail format'),
  password: z.string().nonempty('Password is required').min(8, 'Password must have at least 8 characters')
})

type LoginFormData = z.infer<typeof schema>

export function useLogin() {
  const {
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    register
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema)
  })

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: SignInParams) => {
      return AuthService.signIn(data)
    }
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

      console.log({ accessToken })
    } catch {
      toast.error('Invalid credentials')
    }
  })

  return { handleSubmit, register, errors, isLoading }
}
