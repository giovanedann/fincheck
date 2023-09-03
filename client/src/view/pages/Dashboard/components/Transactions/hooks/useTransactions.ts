import { useCallback, useState } from 'react';
import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

export function useTransactions() {
  const { areValuesVisible } = useDashboard()

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false)

  const handleOpenFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(true)
  }, [])

  const handleCloseFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(false)
  }, [])

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [1],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  }
}
