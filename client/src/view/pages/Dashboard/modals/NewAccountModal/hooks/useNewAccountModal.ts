import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard';

export function useNewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useDashboard()

  return {
    closeNewAccountModal,
    isNewAccountModalOpen
  }
}
