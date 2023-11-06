import { GetTransactionsParams } from 'app/domain/services/TransactionService';
import { useTransactions } from 'app/hooks/useTransactions';
import { useCallback, useEffect, useState } from 'react';
import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

export function useDashboardTransactions() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<GetTransactionsParams['filters']>(() => {
    const today = new Date();

    return {
      month: today.getMonth(),
      year: today.getFullYear()
    }
  })

  const { areValuesVisible } = useDashboard()

  const { transactions, isLoading, isInitialLoading, refetch } = useTransactions({ filters })

  useEffect(() => {
    refetch()
  }, [filters, refetch])

  const handleChangeMonth = useCallback((month: number) => {
    setFilters(prev => ({ ...prev, month }))
  }, [])

  const handleOpenFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(true)
  }, [])

  const handleCloseFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(false)
  }, [])

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    filters,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeMonth
  }
}
