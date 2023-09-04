import { localStorageKeys } from 'app/config/localStorageKeys';
import LocalStorage from 'app/infra/cache/LocalStorage';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

type DashboardContextValues = {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  toggleValuesVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(false)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(false)

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

  const contextValues = useMemo<DashboardContextValues>(() => ({
    areValuesVisible,
    isNewAccountModalOpen,
    toggleValuesVisibility,
    openNewAccountModal,
    closeNewAccountModal,
  }), [
    areValuesVisible,
    isNewAccountModalOpen,
    toggleValuesVisibility,
    openNewAccountModal,
    closeNewAccountModal,
  ])

  return (
    <DashboardContext.Provider value={contextValues}>
      {children}
    </DashboardContext.Provider>
  )
}
