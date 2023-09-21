import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/config/queryKeys';
import BankAccountService from 'app/data/services/BankAccountService';

export function useBankAccounts() {
  const { data = [], isFetching } = useQuery({
    queryKey: [QUERY_KEYS.bankAccounts],
    queryFn: () => BankAccountService.get(),
  })

  return { accounts: data, isFetching }
}
