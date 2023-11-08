import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useBankAccounts } from 'app/hooks/useBankAccounts';
import { useCategories } from 'app/hooks/useCategories';
import { Transaction } from 'app/domain/entities/Transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TransactionService from 'app/data/services/TransactionService';
import { UpdateTransactionParams } from 'app/domain/services/TransactionService';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from 'app/config/queryKeys';

const schema = z.object({
  value: z.union([
    z.string().nonempty('Transaction value is required'),
    z.number().nonnegative(),
  ]),
  name: z.string().nonempty('Transaction name is required'),
  categoryId: z.string().nonempty('Category is required'),
  bankAccountId: z.string().nonempty('Bank account is required'),
  date: z.date()
})

type NewTransactionFormData = z.infer<typeof schema>;

type UseEditTransactionModalParams = {
  transaction: Transaction | null
  onClose: () => void
}

export function useEditTransactionModal({ transaction, onClose }: UseEditTransactionModalParams) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<NewTransactionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.category?.id,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date()
    }
  })

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateTransactionParams) => {
      return TransactionService.update(data)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return TransactionService.delete(transaction!.id)
    }
  })

  const { accounts } = useBankAccounts()
  const { categories } = useCategories()
  const queryClient = useQueryClient()

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === transaction?.type),
    [categories, transaction]
  )

  const handleSubmit = hookFormSubmit(async (data) => {
    const convertedData = {
      ...data,
      value: Number(data.value),
      date: data.date.toISOString()
    }

    try {
      await updateMutation.mutateAsync({
        id: transaction!.id,
        type: transaction!.type,
        ...convertedData
      })

      const toastMessage = transaction?.type === 'EXPENSE'
        ? 'Expense updated with success!'
        : 'Income updated with success!'

      toast.success(toastMessage)

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.transactions] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bankAccounts] })
    } catch {
      const toastMessage = transaction?.type === 'EXPENSE'
        ? 'Error updating the expense!'
        : 'Error updating the income!'

      toast.error(toastMessage)
    } finally {
      onClose()
    }
  })

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  async function handleDeleteTransaction() {
    try {
      await deleteMutation.mutateAsync()
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bankAccounts] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.transactions] })
      toast.success('Account deleted with success!')
    } catch {
      toast.error('Error deleting the account')
    } finally {
      handleCloseDeleteModal()
      onClose()
    }
  }

  return {
    handleSubmit,
    register,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isDeleteModalOpen,
    isLoading: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    accounts,
    categories: filteredCategories,
    errors,
    control
  }
}
