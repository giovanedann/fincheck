import { localStorageKeys } from 'app/config/localStorageKeys';
import LocalStorage from 'app/infra/cache/LocalStorage';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

type DashboardContextValues = {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(false)

  useEffect(() => {
    const localStorageValuesVisibility = LocalStorage.get<boolean>(localStorageKeys.VALUES_VISIBILITY)
    setAreValuesVisible(localStorageValuesVisibility ?? false)
  }, [])

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prev => {
      alert(!prev)
      LocalStorage.set(localStorageKeys.VALUES_VISIBILITY, !prev)
      return !prev
    })
  }, [])

  const contextValues = useMemo(() => ({
    areValuesVisible,
    toggleValuesVisibility
  }), [
    areValuesVisible,
    toggleValuesVisibility
  ])

  return (
    <DashboardContext.Provider value={contextValues}>
      {children}
    </DashboardContext.Provider>
  )
}
