import { useTransactions } from 'app/hooks/useTransactions';
import { useCallback, useState } from 'react';
import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

export function useDashboardTransactions() {
  const { areValuesVisible } = useDashboard()
  const { transactions } = useTransactions()

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
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  }
}
