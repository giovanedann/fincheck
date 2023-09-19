import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { localStorageKeys } from 'app/config/localStorageKeys';
import LocalStorage from 'app/infra/cache/LocalStorage';
import { BankAccount } from 'app/domain/entities/BankAccount';

type DashboardContextValues = {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  accountBeingEdited: BankAccount | null;
  toggleValuesVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(false)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(false)
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState<boolean>(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null)

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

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount)
    setIsEditAccountModalOpen(true)
  }, [])

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null)
    setIsEditAccountModalOpen(false)
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
    isNewTransactionModalOpen,
    newTransactionType,
    isEditAccountModalOpen,
    accountBeingEdited,
    openEditAccountModal,
    closeEditAccountModal,
    toggleValuesVisibility,
    openNewAccountModal,
    closeNewAccountModal,
    openNewTransactionModal,
    closeNewTransactionModal,
  }), [
    areValuesVisible,
    isNewAccountModalOpen,
    isNewTransactionModalOpen,
    newTransactionType,
    isEditAccountModalOpen,
    accountBeingEdited,
    closeEditAccountModal,
    openEditAccountModal,
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
