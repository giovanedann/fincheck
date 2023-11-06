import { CreateTransactionParams, GetTransactionsParams, GetTransactionsResponse, ITransactionService } from 'app/domain/services/TransactionService';
import { httpClient } from 'app/infra/api/httpClient';

class TransactionService implements ITransactionService {
  private readonly client = httpClient;

  async get(params: GetTransactionsParams): Promise<GetTransactionsResponse> {
    const { data } = await this.client.get<GetTransactionsResponse>('/categories', {
      params: params.filters
    });

    return data;
  }

  async create(params: CreateTransactionParams) {
    const { data } = await this.client.post('/transactions', params);

    return data;
  }
}

export default new TransactionService()
