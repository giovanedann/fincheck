import { Category } from 'app/domain/entities/Category'

export interface ICategoryService {
  get: () => Promise<GetCategorysResponse>
}

export type GetCategorysResponse = Array<Category>


