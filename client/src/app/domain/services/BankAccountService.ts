import { BankAccountType } from 'app/domain/@shared/BankAccountType';
import { BankAccount } from 'app/domain/entities/BankAccount';

export interface IBankAccountService {
  create: (params: CreateBankAccountParams) => Promise<void>
  update: (params: UpdateBankAccountParams) => Promise<void>
  delete: (params: DeleteBankAccountParams) => Promise<void>
  get: () => Promise<GetBankAccountsResponse>
}

export type CreateBankAccountParams = {
  name: string;
  color: string;
  initialBalance: number;
  type: BankAccountType;
}

export type UpdateBankAccountParams = {
  id: string;
  name: string;
  color: string;
  initialBalance: number;
  type: BankAccountType;
}

export type DeleteBankAccountParams = {
  id: string;
}

export type GetBankAccountsResponse = Array<BankAccount>


