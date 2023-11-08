export type TransactionType = 'INCOME' | 'EXPENSE'

export type Transaction = {
  id: string
  name: string
  value: number
  date: string
  type: TransactionType
  bankAccountId: string;
  category?: {
    id: string
    name: string
    icon: string
  }
}
