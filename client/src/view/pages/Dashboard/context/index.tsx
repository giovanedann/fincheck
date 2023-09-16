import { localStorageKeys } from 'app/config/localStorageKeys';
import LocalStorage from 'app/infra/cache/LocalStorage';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

type DashboardContextValues = {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  toggleValuesVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(false)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)

  useEffect(() => {
    const localStorageValuesVisibility = LocalStorage.get<boolean>(localStorageKeys.VALUES_VISIBILITY)
    setAreValuesVisible(localStorageValuesVisibility ?? false)
  }, [])

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prev => {
      LocalStorage.set(localStorageKeys.VALUES_VISIBILITY, !prev)
      return !prev
    })
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setIsNewTransactionModalOpen(true)
    setNewTransactionType(type)
  }, [])

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, [])

  const contextValues = useMemo<DashboardContextValues>(() => ({
    areValuesVisible,
    isNewAccountModalOpen,
    toggleValuesVisibility,
    openNewAccountModal,
    closeNewAccountModal,
    openNewTransactionModal,
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
  }), [
    areValuesVisible,
    isNewAccountModalOpen,
    isNewTransactionModalOpen,
    newTransactionType,
    toggleValuesVisibility,
    openNewAccountModal,
    closeNewAccountModal,
    openNewTransactionModal,
    closeNewTransactionModal,
  ])

  return (
    <DashboardContext.Provider value={contextValues}>
      {children}
    </DashboardContext.Provider>
  )
}
