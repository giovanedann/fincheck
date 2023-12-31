import { BankAccount } from 'app/domain/entities/BankAccount';
import { cn } from 'app/utils';
import { formatCurrency } from 'app/utils';

import { BankAccountTypeIcon } from 'view/icons';
import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

type AccountCardProps = {
  bankAccountData: BankAccount
}

export function AccountCard({ bankAccountData }: AccountCardProps) {
  const { currentBalance, color, name, type } = bankAccountData
  const { areValuesVisible, openEditAccountModal } = useDashboard()

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[12.5rem] flex flex-col justify-between border-b-4 border-teal-300"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(bankAccountData)}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            'text-gray-800 font-medium tracking-[-0.5px] mt-4 block transition-all duration-300 ease-in-out',
            !areValuesVisible && 'blur-sm'
          )}
        >
          {formatCurrency(currentBalance)}
        </span>

        <span className="text-gray-600 text-sm">
          Current balance
        </span>
      </div>
    </div>
  )
}
