import { CreateTransactionParams, GetTransactionsParams, GetTransactionsResponse, ITransactionService, UpdateTransactionParams } from 'app/domain/services/TransactionService';
import { httpClient } from 'app/infra/api/httpClient';

class TransactionService implements ITransactionService {
  private readonly client = httpClient;

  async get(params: GetTransactionsParams): Promise<GetTransactionsResponse> {
    const { data } = await this.client.get<GetTransactionsResponse>('/transactions', {
      params: params.filters
    });

    return data;
  }

  async create(params: CreateTransactionParams) {
    const { data } = await this.client.post('/transactions', params);

    return data;
  }

  async update({ id, ...params }: UpdateTransactionParams) {
    const { data } = await this.client.put(`/transactions/${id}`, params);

    return data;
  }

  async delete(transationId: string) {
    const { data } = await this.client.delete(`/transactions/${transationId}`);

    return data;
  }
}

export default new TransactionService()
