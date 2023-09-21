import { CreateTransactionParams, ITransactionService } from 'app/domain/services/TransactionService';
import { httpClient } from 'app/infra/api/httpClient';

class TransactionService implements ITransactionService {
  private readonly client = httpClient;

  async create(params: CreateTransactionParams) {
    const { data } = await this.client.post('/transactions', params);

    return data;
  }
}

export default new TransactionService()
