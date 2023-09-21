import { Button, CurrencyInput, Input, Modal, Select } from 'view/components';
import { useNewTransactionModal } from './hooks/useNewTransactionModal';
import { DateInput } from 'view/components/DateInput';
import { Controller } from 'react-hook-form';

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    categories,
    accounts,
    closeNewTransactionModal,
    handleSubmit,
    register
  } = useNewTransactionModal()

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'New expense' : 'New income'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
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
            render={({ field }) => (
              <DateInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />


        </div>

        <Button type="submit" className="mt-4 w-full">
          Create
        </Button>
      </form>
    </Modal>
  )
}
