export interface IUserService {
  me: () => Promise<MeResponse>
}

export type MeResponse = {
  name: string;
  email: string;
}
