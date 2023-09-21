import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/config/queryKeys';
import CategoryService from 'app/data/services/CategoryService';

export function useCategories() {
  const { data = [], isFetching } = useQuery({
    queryKey: [QUERY_KEYS.categories],
    queryFn: () => CategoryService.get(),
  })

  return { categories: data, isFetching }
}
