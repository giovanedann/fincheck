import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button, Modal } from 'view/components';
import { useFiltersModal } from './hooks/useFiltersModal';
import { cn } from 'app/utils/cn';

type FiltersModalProps = {
  open: boolean;
  onClose: () => void;
}

const mockedAccounts = [
  { id: '1oi2mdio1mdiaidfjij13', name: 'Nubank' },
  { id: '1oi2mdio1mdiaidfjij12', name: 'XP Investimentos' },
  { id: '1oi2mdio1mdiaidfjij14', name: 'Cash' },
  { id: '1oi2mdio1mdiaidfjij15', name: 'Santander' },
  { id: '1oi2mdio1mdiaidfjij17', name: 'PagBank' },
]

export function FiltersModal({ onClose, open }: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
  } = useFiltersModal()

  return (
    <Modal open={open} onClose={onClose} title="Filters">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Bank account
        </span>

        <div className="space-y-2 mt-2 max-h-[10rem] overflow-y-auto">
          {mockedAccounts.map(({ id, name }) => (
            <button
              key={id}
              className={
                cn(
                  'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors',
                  selectedBankAccountId === id && '!bg-gray-200'
                )
              }
              onClick={() => handleSelectBankAccount(id)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">
          Year
        </span>

        <div className="mt-2 w-full flex items-center justify-between">
          <button className="w-12 h-12 grid place-items-center">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tacking-[-0.5px]">2023</span>
          </div>

          <button className="w-12 h-12 grid place-items-center">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        <Button className="w-full mt-10">
          Apply filters
        </Button>
      </div>
    </Modal>
  )
}
