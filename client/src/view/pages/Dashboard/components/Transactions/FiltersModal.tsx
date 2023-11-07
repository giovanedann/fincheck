import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button, Modal } from 'view/components';
import { useFiltersModal } from './hooks/useFiltersModal';
import { cn } from 'app/utils';

type FiltersModalProps = {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: { bankAccountId: string | undefined; year: number }) => void;
}

export function FiltersModal({ onClose, open, onApplyFilters }: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts
  } = useFiltersModal()

  return (
    <Modal open={open} onClose={onClose} title="Filters">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Bank account
        </span>

        <div className="space-y-2 mt-2 max-h-[10rem] overflow-y-auto">
          {accounts.map(({ id, name }) => (
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
          <button
            className="w-12 h-12 grid place-items-center"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tacking-[-0.5px]">
              {selectedYear}
            </span>
          </div>

          <button
            className="w-12 h-12 grid place-items-center"
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        <Button
          className="w-full mt-10"
          onClick={() => onApplyFilters({ bankAccountId: selectedBankAccountId, year: selectedYear })}
        >
          Apply filters
        </Button>
      </div>
    </Modal>
  )
}
