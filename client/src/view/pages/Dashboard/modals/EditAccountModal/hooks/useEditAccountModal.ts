import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import BankAccountService from 'app/data/services/BankAccountService';
import { CreateBankAccountParams, DeleteBankAccountParams } from 'app/domain/services/BankAccountService';
import { QUERY_KEYS } from 'app/config/queryKeys';
import { useState } from 'react';

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Balance is required'),
    z.number().nonnegative(),
  ]),
  name: z.string().nonempty('Name of account is required'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().nonempty('Color is required')
})

export type EditAccountFormData = z.infer<typeof schema>;

export function useEditAccountModal() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const {
    closeEditAccountModal,
    isEditAccountModalOpen,
    accountBeingEdited
  } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<EditAccountFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    }
  })

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (data: CreateBankAccountParams) => {
      return BankAccountService.update({
        id: accountBeingEdited!.id,
        ...data,
      })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (data: DeleteBankAccountParams) => {
      return BankAccountService.delete(data)
    }
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    let numberFormatInitialBalance;

    if (typeof data.initialBalance === 'string') {
      numberFormatInitialBalance = Number(data.initialBalance.replace(/,/g, ''))
    } else {
      numberFormatInitialBalance = data.initialBalance
    }

    const updateAccountParams = {
      ...data,
      initialBalance: numberFormatInitialBalance
    }

    try {
      await updateMutation.mutateAsync(updateAccountParams)

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bankAccounts] })

      toast.success('Account updated with success!')

      closeEditAccountModal()
    } catch {
      toast.error('Error updating the account!')
    }
  })

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  async function handleDeleteAccount() {
    try {
      await deleteMutation.mutateAsync({ id: accountBeingEdited!.id })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bankAccounts] })
      toast.success('Transaction deleted with success!')
    } catch {
      toast.error('Error deleting the transaction')
    } finally {
      handleCloseDeleteModal()
      closeEditAccountModal()
    }
  }

  return {
    isLoading: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    isEditAccountModalOpen,
    isDeleteModalOpen,
    errors,
    control,
    closeEditAccountModal,
    handleOpenDeleteModal,
    handleDeleteAccount,
    handleCloseDeleteModal,
    register,
    handleSubmit,
  }
}
