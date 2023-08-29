import { ReactNode, createContext } from "react";

type AuthContextValues = {
  signedIn: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ signedIn: false }}>
      {children}
    </AuthContext.Provider>
  )
}

