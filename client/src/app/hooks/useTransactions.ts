import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/config/queryKeys';
import TransactionService from 'app/data/services/TransactionService';

export function useTransactions() {
  const { data, isFetching, isInitialLoading } = useQuery({
    queryKey: [QUERY_KEYS.transactions],
    queryFn: () => TransactionService.get({ filters: { month: 10, year: 2023 } })
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading
  }
}
