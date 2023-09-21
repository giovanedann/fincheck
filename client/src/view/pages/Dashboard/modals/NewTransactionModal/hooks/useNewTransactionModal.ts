import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

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

  return {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    handleSubmit,
    register,
    errors,
    control
  }
}
