import { PlusIcon } from '@radix-ui/react-icons';
import { Dropdown } from 'view/components';
import { CategoryIcon, BankAccountIcon } from 'view/icons';

export function Fab() {
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
          <Dropdown.Item className="gap-2">
            <CategoryIcon type="expense" />
            New expense
          </Dropdown.Item>

          <Dropdown.Item className="gap-2">
            <CategoryIcon type="income" />
            New income
          </Dropdown.Item>

          <Dropdown.Item className="gap-2">
            <BankAccountIcon />
            New bank account
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  )
}
