import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';
import { useBankAccounts } from 'app/hooks/useBankAccounts';
import { useCategories } from 'app/hooks/useCategories';
import { useMemo } from 'react';

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

  const handleSubmit = hookFormSubmit((data) => {
    console.log({ data })
    reset()
  })

  const { accounts } = useBankAccounts()
  const { categories } = useCategories()

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === newTransactionType),
    [categories, newTransactionType]
  )

  return {
    closeNewTransactionModal,
    handleSubmit,
    register,
    isNewTransactionModalOpen,
    newTransactionType,
    accounts,
    categories: filteredCategories,
    errors,
    control
  }
}
