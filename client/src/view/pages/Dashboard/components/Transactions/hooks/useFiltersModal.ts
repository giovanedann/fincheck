import { useCallback, useState } from 'react';

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<null | string>(null)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const handleSelectBankAccount = useCallback((bankAccountId: string) => {
    setSelectedBankAccountId(prev => (
      bankAccountId === prev
        ? null
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
  }
}
