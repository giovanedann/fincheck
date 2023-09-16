import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';
import { swapCommasAndDots } from 'app/utils';

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
  } = useForm<NewAccountFormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    data.initialBalance = swapCommasAndDots(data.initialBalance)

    console.log({ data })
  })

  return {
    closeNewAccountModal,
    isNewAccountModalOpen,
    register,
    errors,
    control,
    handleSubmit
  }
}
