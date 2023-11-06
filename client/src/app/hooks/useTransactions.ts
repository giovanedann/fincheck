import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/config/queryKeys';
import TransactionService from 'app/data/services/TransactionService';

export function useTransactions() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.transactions],
    queryFn: () => TransactionService.get({ filters: { month: 8, year: 2023 } })
  })

  return {
    transactions: data ?? [],
  }
}
