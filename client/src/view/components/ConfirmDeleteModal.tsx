import { TrashIcon } from 'view/icons';
import { Button, Modal } from '.';

type ConfirmDeleteModalProps = {
  onClose: () => void
  onConfirm: () => void;
  title?: string
  description?: string
  isLoading?: boolean
}

export function ConfirmDeleteModal({ onClose, title, description, onConfirm, isLoading }: ConfirmDeleteModalProps) {
  return (
    <Modal open onClose={onClose} title="Delete">
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-14 h-14 rounded-full bg-red-0 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-11/12 text-gray-800 font-bold tracking-[-0.5px]">
          {title ? title : 'Are you sure about that? This action cannot be undone!'}
        </p>

        {description && (
          <p className="w-11/12 text-gray-800 tracking-[-0.5px]">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full bg-red-900 hover:bg-red-800"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Confirm
        </Button>

        <Button
          className="w-full bg-transparent hover:bg-gray-800/5 text-gray-800 border border-gray-800"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  )
}
