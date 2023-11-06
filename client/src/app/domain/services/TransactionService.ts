import { Transaction, TransactionType } from 'app/domain/entities/Transaction';

export interface ITransactionService {
  create: (params: CreateTransactionParams) => Promise<void>
  get: (params: GetTransactionsParams) => Promise<GetTransactionsResponse>
}

export type CreateTransactionParams = {
  bankAccountId: string;
  categoryId: string;
  name: string;
  date: string;
  value: number;
  type: TransactionType;
}

export type GetTransactionsResponse = Array<Transaction>

export type GetTransactionsParams = {
  filters: {
    month: number;
    year: number;
    bankAccountId?: string;
    type?: TransactionType;
  }
}
