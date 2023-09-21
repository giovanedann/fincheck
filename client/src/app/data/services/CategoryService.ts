import { GetCategorysResponse, ICategoryService } from 'app/domain/services/CategoryService';
import { httpClient } from 'app/infra/api/httpClient';

class CategoryService implements ICategoryService {
  private readonly client = httpClient;

  async get(): Promise<GetCategorysResponse> {
    const { data } = await this.client.get<GetCategorysResponse>('/categories');

    return data;
  }
}

export default new CategoryService()
