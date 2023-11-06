import { Category } from 'app/domain/entities/Category'

export interface ICategoryService {
  get: () => Promise<GetCategoriesResponse>
}

export type GetCategoriesResponse = Array<Category>


