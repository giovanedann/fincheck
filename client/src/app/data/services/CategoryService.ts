import { GetCategoriesResponse, ICategoryService } from 'app/domain/services/CategoryService';
import { httpClient } from 'app/infra/api/httpClient';

class CategoryService implements ICategoryService {
  private readonly client = httpClient;

  async get(): Promise<GetCategoriesResponse> {
    const { data } = await this.client.get<GetCategoriesResponse>('/categories');

    return data;
  }
}

export default new CategoryService()
