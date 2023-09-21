import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';
import { useBankAccounts } from 'app/hooks/useBankAccounts';
import { useCategories } from 'app/hooks/useCategories';
import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CreateTransactionParams } from 'app/domain/services/TransactionService';
import TransactionService from 'app/data/services/TransactionService';
import toast from 'react-hot-toast';

const schema = z.object({
  value: z.string().nonempty('Transaction value is required'),
  name: z.string().nonempty('Transaction name is required'),
  categoryId: z.string().nonempty('Category is required'),
  bankAccountId: z.string().nonempty('Bank account is required'),
  date: z.date()
})

type NewTransactionFormData = z.infer<typeof schema>;

export function useNewTransactionModal() {
  const { closeNewTransactionModal, isNewTransactionModalOpen, newTransactionType } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<NewTransactionFormData>({
    resolver: zodResolver(schema),
  })

  const { accounts } = useBankAccounts()
  const { categories } = useCategories()

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === newTransactionType),
    [categories, newTransactionType]
  )

  const {
    isLoading,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: CreateTransactionParams) => {
      return TransactionService.create(data)
    }
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    const numberFormatTransactionValue = Number(data.value.replace(/,/g, ''))

    const params = {
      ...data,
      date: data.date.toISOString(),
      value: numberFormatTransactionValue,
      type: newTransactionType!
    }

    try {
      await mutateAsync(params)

      closeNewTransactionModal()
      toast.success('Transaction created with success!')
      reset({
        categoryId: '',
        bankAccountId: '',
        date: new Date(),
        name: '',
        value: ''
      })
    } catch {
      toast.error('Error creating a new transaction!')
    }
  })

  return {
    closeNewTransactionModal,
    handleSubmit,
    register,
    isLoading,
    isNewTransactionModalOpen,
    newTransactionType,
    accounts,
    categories: filteredCategories,
    errors,
    control
  }
}
