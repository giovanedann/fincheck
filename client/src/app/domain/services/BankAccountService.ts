import { BankAccountType } from 'app/domain/@shared/BankAccountType';

export interface IBankAccountService {
  create: (params: CreateBankAccountParams) => Promise<void>
  get: () => Promise<GetBankAccountsResponse>
}

export type CreateBankAccountParams = {
  name: string;
  color: string;
  initialBalance: number;
  type: BankAccountType;
}

export type GetBankAccountsResponse = Array<{
  id: string,
  name: string,
  initialBalance: number,
  type: BankAccountType,
  color: string,
  currentBalance: number
}>


