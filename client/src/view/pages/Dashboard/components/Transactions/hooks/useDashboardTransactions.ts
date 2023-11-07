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
    console.log({ filters })
    refetch()
  }, [filters, refetch])

  function handleChangeFilters<T extends keyof GetTransactionsParams['filters']>(filter: T) {
    return (value: GetTransactionsParams['filters'][T]) => {
      if (value === filters[filter]) return;
      setFilters(prev => ({
        ...prev,
        [filter]: value
      }))
    }
  }

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
    handleChangeFilters
  }
}
