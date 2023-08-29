import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";

import LocalStorage from "../infra/cache/LocalStorage";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import UserService from "../data/services/UserService";
import { toast } from "react-hot-toast";
import { Splash } from "../../view/components";

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

  const { isError, isSuccess, isFetching, remove } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => UserService.me(),
    enabled: signedIn,
    staleTime: Infinity
  });

  const signIn = useCallback((accessToken: string) => {
    LocalStorage.set(localStorageKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const signOut = useCallback(() => {
    LocalStorage.remove(localStorageKeys.ACCESS_TOKEN)

    setSignedIn(false)
    remove()
  }, [remove])

  useEffect(() => {
    if (isError) {
      signOut()
      toast.error('Session expired! Sign in again, please.')
    }
  }, [isError, signOut])

  const contextValues: AuthContextValues = useMemo(() => ({
    signedIn: isSuccess && signedIn,
    signIn,
    signOut
  }), [
    isSuccess,
    signedIn,
    signIn,
    signOut
  ])

  return (
    <AuthContext.Provider value={contextValues}>
      <Splash show={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  )
}

