import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import LocalStorage from 'app/infra/cache/LocalStorage';
import { localStorageKeys } from 'app/config/localStorageKeys';
import UserService from 'app/data/services/UserService';

import { Splash } from 'view/components';
import { MeResponse } from 'app/domain/services/UserService';
import { QUERY_KEYS } from 'app/config/queryKeys';

type AuthContextValues = {
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
  loggedUserData: MeResponse | undefined;
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

  const { isError, isSuccess, isFetching, remove, data } = useQuery({
    queryKey: [QUERY_KEYS.users, QUERY_KEYS.me],
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
    signOut,
    loggedUserData: data
  }), [
    isSuccess,
    data,
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

