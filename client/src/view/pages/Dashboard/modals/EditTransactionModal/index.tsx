import { Button, ConfirmDeleteModal, CurrencyInput, Input, Modal, Select } from 'view/components';
import { DateInput } from 'view/components/DateInput';
import { Controller } from 'react-hook-form';
import { useEditTransactionModal } from './hooks/useEditTransactionModal';
import { Transaction } from 'app/domain/entities/Transaction';
import { TrashIcon } from '@radix-ui/react-icons';

type EditTransactionModalProps = {
  transaction: Transaction | null
  open: boolean
  onClose: () => void
}

export function EditTransactionModal({ transaction, onClose, open }: EditTransactionModalProps) {
  const {
    control,
    errors,
    categories,
    accounts,
    isLoading,
    isDeleteModalOpen,
    handleDeleteTransaction,
    isDeleting,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleSubmit,
    register
  } = useEditTransactionModal({ transaction, onClose })

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isDeleting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
        title="Are you sure? This action cannot be undone!"
      />
    )
  }

  return (
    <Modal
      title={isExpense ? 'Edit expense' : 'Edit income'}
      open={open}
      onClose={onClose}
      rightAction={(
        <TrashIcon className="w-6 h-6 text-red-900" onClick={handleOpenDeleteModal} />
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            {isExpense ? 'Expense' : 'Income'} value
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field }) => (
                <CurrencyInput
                  error={errors.value?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Expense title' : 'Income title'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                placeholder="Category"
                options={categories.map(category => ({
                  label: category.name,
                  value: category.id
                }))}
                error={errors.categoryId?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field }) => (
              <Select
                placeholder={isExpense ? 'Pay with' : 'Receive with'}
                options={accounts.map(account => ({
                  label: account.name,
                  value: account.id,
                }))}
                error={errors.bankAccountId?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field }) => (
              <DateInput
                error={errors.date?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />


        </div>

        <Button type="submit" className="mt-4 w-full" isLoading={isLoading}>
          Save
        </Button>
      </form>
    </Modal>
  )
}
