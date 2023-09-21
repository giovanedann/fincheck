export type CategoryType = 'INCOME' | 'EXPENSE'

export interface Category {
  id: string
  name: string
  icon: string
  type: CategoryType
}
