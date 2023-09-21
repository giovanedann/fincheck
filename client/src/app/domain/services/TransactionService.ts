import { TransactionType } from 'app/domain/entities/Transaction';

export interface ITransactionService {
  create: (params: CreateTransactionParams) => Promise<void>
}

export type CreateTransactionParams = {
  bankAccountId: string;
  categoryId: string;
  name: string;
  date: string;
  value: number;
  type: TransactionType;
}


