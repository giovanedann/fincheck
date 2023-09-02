import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

export function useTransactions() {
  const { areValuesVisible } = useDashboard()

  return { areValuesVisible }
}
