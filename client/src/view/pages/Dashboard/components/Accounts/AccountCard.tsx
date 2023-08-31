import { formatCurrency } from 'app/utils/formatCurrency';
import { BankAccountTypeIcon } from 'view/icons';

type AccountCardProps = {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'CHECKING' | 'INVESTMENT'
}

export function AccountCard({ balance, color, name, type }: AccountCardProps) {
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[12.5rem] flex flex-col justify-between border-b-4 border-teal-300"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {formatCurrency(balance)}
        </span>

        <span className="text-gray-600 text-sm">
          Current balance
        </span>
      </div>
    </div>
  )
}