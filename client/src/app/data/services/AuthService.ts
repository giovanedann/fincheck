import { IAuthService, SignInParams, SignInResponse, SignUpParams, SignUpResponse } from 'app/domain/services/AuthService';
import { httpClient } from 'app/infra/api/httpClient';
import { sleep } from 'app/utils';

class AuthService implements IAuthService {
  private readonly client = httpClient;

  async signUp(params: SignUpParams) {
    await sleep(1000)
    const { data } = await this.client.post<SignUpResponse>('/auth/signup', params)

    return data;
  }

  async signIn(params: SignInParams) {
    await sleep(1000)
    const { data } = await this.client.post<SignInResponse>('/auth/signin', params)

    return data;
  }
}

export default new AuthService()
