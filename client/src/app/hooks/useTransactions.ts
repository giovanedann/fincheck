import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/config/queryKeys';
import TransactionService from 'app/data/services/TransactionService';
import { GetTransactionsParams } from 'app/domain/services/TransactionService';

type UseTransactionsParams = {
  filters: GetTransactionsParams['filters']
}

export function useTransactions({ filters }: UseTransactionsParams) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.transactions],
    queryFn: () => TransactionService.get({ filters })
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetch
  }
}
