import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import BankAccountService from 'app/data/services/BankAccountService';
import { CreateBankAccountParams } from 'app/domain/services/BankAccountService';
import { QUERY_KEYS } from 'app/config/queryKeys';

const schema = z.object({
  initialBalance: z.string().nonempty('Balance is required'),
  name: z.string().nonempty('Name of account is required'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().nonempty('Color is required')
})

export type NewAccountFormData = z.infer<typeof schema>;

export function useNewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<NewAccountFormData>({
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient();

  const {
    isLoading,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: CreateBankAccountParams) => {
      return BankAccountService.create(data)
    }
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    const numberFormatInitialBalance = Number(data.initialBalance.replace(/,/g, ''))

    const createAccountParams = {
      ...data,
      initialBalance: numberFormatInitialBalance
    }

    try {
      await mutateAsync(createAccountParams)

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bankAccounts] })

      toast.success('Account created with success!')

      closeNewAccountModal()

      reset({
        color: '',
        initialBalance: '',
        name: '',
        type: 'CHECKING'
      })
    } catch {
      toast.error('Error creating a new account!')
    }
  })

  return {
    isLoading,
    isNewAccountModalOpen,
    errors,
    control,
    closeNewAccountModal,
    register,
    handleSubmit,
  }
}
