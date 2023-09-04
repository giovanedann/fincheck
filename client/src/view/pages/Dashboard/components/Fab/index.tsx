import { PlusIcon } from '@radix-ui/react-icons';
import { Dropdown } from 'view/components';
import { BankAccountIcon, ExpensesIcon, IncomeIcon } from 'view/icons';
import { useDashboard } from '../../hooks/useDashboard';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard()

  return (
    <div className="fixed right-4 bottom-4">

      <Dropdown.Root>
        <Dropdown.Trigger>
          <div
            className="bg-teal-900 text-white w-12 h-12 rounded-full grid place-items-center"
          >
            <PlusIcon className="w-6 h-6" />
          </div>
        </Dropdown.Trigger>

        <Dropdown.Content side="top" className="mb-2 mr-4">
          <Dropdown.Item className="gap-2" onSelect={() => openNewTransactionModal('EXPENSE')}>
            <ExpensesIcon />
            New expense
          </Dropdown.Item>

          <Dropdown.Item className="gap-2" onSelect={() => openNewTransactionModal('INCOME')}>
            <IncomeIcon />
            New income
          </Dropdown.Item>

          <Dropdown.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            New bank account
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  )
}
