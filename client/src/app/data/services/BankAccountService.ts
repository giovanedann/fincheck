import { GetBankAccountsResponse, CreateBankAccountParams, IBankAccountService } from 'app/domain/services/BankAccountService';
import { httpClient } from 'app/infra/api/httpClient';

class BankAccountService implements IBankAccountService {
  private readonly client = httpClient;

  async get(): Promise<GetBankAccountsResponse> {
    const { data } = await this.client.get<GetBankAccountsResponse>('/bank-accounts');

    return data;
  }

  async create(params: CreateBankAccountParams) {
    const { data } = await this.client.post('/bank-accounts', params);

    return data;
  }
}

export default new BankAccountService()
