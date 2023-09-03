import { useCallback, useState } from 'react';

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<null | string>(null)

  const handleSelectBankAccount = useCallback((bankAccountId: string) => {
    setSelectedBankAccountId(prev => (
      bankAccountId === prev
        ? null
        : bankAccountId
    ))
  }, [])

  return {
    selectedBankAccountId,
    handleSelectBankAccount
  }
}
