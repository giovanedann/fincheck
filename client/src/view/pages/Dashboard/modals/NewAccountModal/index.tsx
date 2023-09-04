import { CurrencyInput, Input, Modal, Select } from 'view/components';
import { useNewAccountModal } from './hooks/useNewAccountModal';

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useNewAccountModal()

  return (
    <Modal title="New account" open={isNewAccountModalOpen} onClose={closeNewAccountModal}>
      <form>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Balance</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">$</span>
            <CurrencyInput />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" name="name" placeholder="Name" />
          <Select
            placeholder="Type"
            options={[
              { value: 'INVESTMENT', label: 'Investment' },
              { value: 'CASH', label: 'Cash' },
              { value: 'CHECKING', label: 'Checking' },
            ]}
          />
        </div>
      </form>
    </Modal>
  )
}
