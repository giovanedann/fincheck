import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";

import LocalStorage from "../infra/cache/LocalStorage";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import UserService from "../data/services/UserService";
import { toast } from "react-hot-toast";

type AuthContextValues = {
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
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

  const signOut = useCallback(() => {
    LocalStorage.remove(localStorageKeys.ACCESS_TOKEN)

    setSignedIn(false)
  }, [])

  const { isError } = useQuery({
    queryKey: ['loggedUser'],
    queryFn: () => UserService.me(),
    enabled: signedIn
  });

  useEffect(() => {
    if (isError) {
      signOut()
      toast.error('Session expired! Sign in again, please.')
    }
  }, [isError, signOut])

  const contextValues: AuthContextValues = useMemo(() => ({
    signedIn,
    signIn,
    signOut
  }), [
    signedIn,
    signIn,
    signOut
  ])

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

