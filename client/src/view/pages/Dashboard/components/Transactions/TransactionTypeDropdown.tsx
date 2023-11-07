import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Dropdown } from 'view/components';

import { ExpensesIcon, IncomeIcon, TransactionsIcon } from 'view/icons';

type TransactionTypeDropdownProps = {
  onSelect: (type: 'INCOME' | 'EXPENSE' | undefined) => void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined
}

export function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <div className="flex items-center gap-2">
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === 'EXPENSE' && 'Expenses'}
            {selectedType === 'INCOME' && 'Incomes'}
            {selectedType === undefined && 'Transactions'}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </div>
      </Dropdown.Trigger>

      <Dropdown.Content className="w-[14.5rem] z-50 mt-2" side="bottom">
        <Dropdown.Item className="gap-2" onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Incomes
        </Dropdown.Item>

        <Dropdown.Item className="gap-2" onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Expenses
        </Dropdown.Item>

        <Dropdown.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transactions
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
