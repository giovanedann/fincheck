export interface IAuthService {
  signUp: (params: SignUpParams) => Promise<SignUpResponse>
  signIn: (params: SignInParams) => Promise<SignInResponse>
}

export type SignUpParams = {
  name: string;
  email: string;
  password: string;
}

export type SignUpResponse = {
  accessToken: string;
}

export type SignInParams = {
  email: string;
  password: string;
}

export type SignInResponse = {
  accessToken: string;
}

