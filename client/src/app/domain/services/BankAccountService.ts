export interface IBankAccountService {
  create: (params: CreateBankAccountParams) => Promise<void>
}

export type CreateBankAccountParams = {
  name: string;
  color: string;
  initialBalance: number;
  type: 'INVESTMENT' | 'CHECKING' | 'CASH';
}


