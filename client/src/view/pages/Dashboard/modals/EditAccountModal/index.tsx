import { Button, ColorsDropdown, ConfirmDeleteModal, CurrencyInput, Input, Modal, Select } from 'view/components';
import { useEditAccountModal } from './hooks/useEditAccountModal';
import { Controller } from 'react-hook-form';
import { TrashIcon } from 'view/icons';

export function EditAccountModal() {
  const {
    isLoading,
    isEditAccountModalOpen,
    errors,
    isDeleteModalOpen,
    control,
    handleSubmit,
    closeEditAccountModal,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteAccount,
    register,
  } = useEditAccountModal()

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        title="Are you sure? This action cannot be undone!"
        description="By excluding this account, all related transactions will be deleted too."
      />
    )
  }

  return (
    <div>
      <Modal
        title="Edit account"
        open={isEditAccountModalOpen}
        onClose={closeEditAccountModal}
        rightAction={(
          <TrashIcon className="w-6 h-6 text-red-900" onClick={handleOpenDeleteModal} />
        )}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <span className="text-gray-600 text-xs tracking-[-0.5px]">Balance</span>

            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-lg tracking-[-0.5px]">$</span>
              <Controller
                control={control}
                name="initialBalance"
                defaultValue={0}
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
            Save
          </Button>
        </form>
      </Modal>

    </div>
  )
}
