import { IAuthService, SignUpParams, SignUpResponse } from "../../domain/services/AuthService";
import { httpClient } from "../api/httpClient"

class AuthService implements IAuthService {
  private readonly client = httpClient;

  async signUp(params: SignUpParams) {
    const { data } = await this.client.post<SignUpResponse>('/auth/signup', params)

    return data;
  }
}

export default new AuthService()
