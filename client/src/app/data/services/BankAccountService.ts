import { GetBankAccountsResponse, CreateBankAccountParams, IBankAccountService, UpdateBankAccountParams, DeleteBankAccountParams } from 'app/domain/services/BankAccountService';
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

  async update(params: UpdateBankAccountParams) {
    const { data } = await this.client.put(`/bank-accounts/${params.id}`, params);

    return data;
  }

  async delete(params: DeleteBankAccountParams) {
    await this.client.delete(`/bank-accounts/${params.id}`);
  }
}

export default new BankAccountService()
