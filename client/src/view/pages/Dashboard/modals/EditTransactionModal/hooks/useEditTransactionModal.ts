import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useBankAccounts } from 'app/hooks/useBankAccounts';
import { useCategories } from 'app/hooks/useCategories';
import { Transaction } from 'app/domain/entities/Transaction';

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
}

export function useEditTransactionModal({ transaction }: UseEditTransactionModalParams) {
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

  const { accounts } = useBankAccounts()
  const { categories } = useCategories()

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === transaction?.type),
    [categories, transaction]
  )

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log({ data })
  })

  return {
    handleSubmit,
    register,
    isLoading: false,
    accounts,
    categories: filteredCategories,
    errors,
    control
  }
}
