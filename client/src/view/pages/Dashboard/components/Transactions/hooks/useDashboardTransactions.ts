import { Transaction } from 'app/domain/entities/Transaction';
import { GetTransactionsParams } from 'app/domain/services/TransactionService';
import { useTransactions } from 'app/hooks/useTransactions';
import { useCallback, useEffect, useState } from 'react';
import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

export function useDashboardTransactions() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false)
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState<boolean>(false)
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null)
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

  function handleApplyFiltersModal(filters: { bankAccountId: string | undefined; year: number }) {
    handleChangeFilters('bankAccountId')(filters.bankAccountId)
    handleChangeFilters('year')(filters.year)
    handleCloseFiltersModal()
  }

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

  const handleOpenEditTransactionModal = useCallback((transaction: Transaction) => {
    setIsEditTransactionModalOpen(true)
    setTransactionBeingEdited(transaction)
  }, [])

  const handleCloseEditTransactionModal = useCallback(() => {
    setIsEditTransactionModalOpen(false)
    setTransactionBeingEdited(null)
  }, [])

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    filters,
    transactions,
    isFiltersModalOpen,
    isEditTransactionModalOpen,
    transactionBeingEdited,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    handleApplyFiltersModal,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal
  }
}
