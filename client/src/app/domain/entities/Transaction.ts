export type TransactionType = 'INCOME' | 'EXPENSE'

export type Transaction = {
  id: string,
  userId: string,
  bankAccountId: string,
  categoryId: string,
  name: string,
  value: number
  date: string,
  type: TransactionType
}
