import { BankAccountType } from 'app/domain/@shared/BankAccountType'

export type BankAccount = {
  id: string,
  name: string,
  initialBalance: number,
  type: BankAccountType,
  color: string,
  currentBalance: number
}
