import { ReactNode, createContext, useCallback, useMemo, useState } from "react";

import LocalStorage from "../infra/cache/LocalStorage";
import { localStorageKeys } from "../config/localStorageKeys";

type AuthContextValues = {
  signedIn: boolean;
  signIn: (accessToken: string) => void;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = LocalStorage.get(localStorageKeys.ACCESS_TOKEN)

    return Boolean(storedAccessToken)
  })

  const signIn = useCallback((accessToken: string) => {
    LocalStorage.set(localStorageKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const contextValues: AuthContextValues = useMemo(() => ({
    signedIn,
    signIn
  }), [
    signedIn,
    signIn,
  ])

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

