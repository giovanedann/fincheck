import { Button, ColorsDropdown, CurrencyInput, Input, Modal, Select } from 'view/components';
import { useNewAccountModal } from './hooks/useNewAccountModal';
import { Controller } from 'react-hook-form';

export function NewAccountModal() {
  const {
    isLoading,
    isNewAccountModalOpen,
    errors,
    control,
    handleSubmit,
    closeNewAccountModal,
    register,
  } = useNewAccountModal()

  return (
    <Modal title="New account" open={isNewAccountModalOpen} onClose={closeNewAccountModal}>
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Balance</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">$</span>
            <Controller
              control={control}
              name="initialBalance"
              render={({ field }) => (
                <CurrencyInput
                  error={errors.initialBalance?.message}
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
            placeholder="Name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field }) => (
              <Select
                placeholder="Type"
                error={errors.type?.message}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: 'INVESTMENT', label: 'Investment' },
                  { value: 'CASH', label: 'Cash' },
                  { value: 'CHECKING', label: 'Checking' },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field }) => (
              <ColorsDropdown
                error={errors.color?.message}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

        </div>

        <Button type="submit" className="mt-4 w-full" isLoading={isLoading}>
          Create
        </Button>
      </form>
    </Modal>
  )
}
