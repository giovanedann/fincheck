import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';

type DashboardContextValues = {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(false)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prev => !prev)
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
