import { useBankAccounts } from 'app/hooks/useBankAccounts';
import { useCallback, useState } from 'react';

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<undefined | string>(undefined)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const { accounts } = useBankAccounts()

  const handleSelectBankAccount = useCallback((bankAccountId: string) => {
    setSelectedBankAccountId(prev => (
      bankAccountId === prev
        ? undefined
        : bankAccountId
    ))
  }, [])

  const handleChangeYear = useCallback((step: number) => {
    setSelectedYear(prev => prev + step)
  }, [])

  return {
    selectedYear,
    selectedBankAccountId,
    handleChangeYear,
    handleSelectBankAccount,
    accounts
  }
}
