import { Modal } from 'view/components';
import { useNewAccountModal } from './hooks/useNewAccountModal';

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useNewAccountModal()

  return (
    <Modal title="New account" open={isNewAccountModalOpen} onClose={closeNewAccountModal}>
      NewAccountModal
    </Modal>
  )
}
