import { localStorageKeys } from 'app/config/localStorageKeys';
import LocalStorage from 'app/infra/cache/LocalStorage';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

type DashboardContextValues = {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  toggleValuesVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  openNewTransactionModal: () => void;
  closeNewTransactionModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(false)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(true)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(true)

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

  const openNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true)
  }, [])

  const closeNewTransactionModal = useCallback(() => {
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
  }), [
    areValuesVisible,
    isNewAccountModalOpen,
    isNewTransactionModalOpen,
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
