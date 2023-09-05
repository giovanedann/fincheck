import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

export function useNewTransactionModal() {
  const { closeNewTransactionModal, isNewTransactionModalOpen, newTransactionType } = useDashboard()

  return {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType
  }
}
