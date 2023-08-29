export interface IAuthService {
  signUp: (params: SignUpParams) => Promise<SignUpResponse>
}

export type SignUpParams = {
  name: string;
  email: string;
  password: string;
}

export type SignUpResponse = {
  accessToken: string;
}
