import { IUserService, MeResponse } from "../../domain/services/UserService";
import { httpClient } from "../../infra/api/httpClient";
import { sleep } from "../../utils/sleep";

class UserService implements IUserService {
  private readonly client = httpClient;

  async me() {
    await sleep(1000)
    const { data } = await this.client.get<MeResponse>('/users/me')

    return data;
  }
}

export default new UserService()
