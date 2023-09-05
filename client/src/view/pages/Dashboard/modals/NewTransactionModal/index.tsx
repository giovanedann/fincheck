import { CurrencyInput, Input, Modal, Select } from 'view/components';
import { useNewTransactionModal } from './hooks/useNewTransactionModal';
import { DateInput } from 'view/components/DateInput';

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType
  } = useNewTransactionModal()

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'New expense' : 'New income'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            {isExpense ? 'Expense' : 'Income'} value
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">$</span>
            <CurrencyInput />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? 'Expense title' : 'Income title'}
          />

          <Select
            placeholder="Category"
            options={[
              { value: 'INVESTMENT', label: 'Investment' },
              { value: 'CASH', label: 'Cash' },
              { value: 'CHECKING', label: 'Checking' },
            ]}
          />

          <Select
            placeholder={isExpense ? 'Pay with' : 'Receive with'}
            options={[
              { value: 'INVESTMENT', label: 'Investment' },
              { value: 'CASH', label: 'Cash' },
              { value: 'CHECKING', label: 'Checking' },
            ]}
          />

          <DateInput />
        </div>
      </form>
    </Modal>
  )
}
