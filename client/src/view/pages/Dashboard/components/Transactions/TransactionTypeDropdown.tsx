import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Dropdown } from 'view/components';

import { ExpensesIcon, IncomeIcon, TransactionsIcon } from 'view/icons';

export function TransactionTypeDropdown() {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <div className="flex items-center gap-2">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            Transactions
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </div>
      </Dropdown.Trigger>

      <Dropdown.Content className="w-[14.5rem] z-50 mt-2" side="bottom">
        <Dropdown.Item className="gap-2">
          <IncomeIcon />
          Income
        </Dropdown.Item>

        <Dropdown.Item className="gap-2">
          <ExpensesIcon />
          Expense
        </Dropdown.Item>

        <Dropdown.Item className="gap-2">
          <TransactionsIcon />
          All
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
