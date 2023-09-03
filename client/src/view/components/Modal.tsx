import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from 'app/utils/cn'
import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  className?: string;
  title: string;
  open: boolean;
  onClose: () => void;
  rightAction?: ReactNode;
}

export function Modal({ className, children, open, title, rightAction, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={
            cn(
              'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
              'data-[state=open]:animate-overlay-show'
            )
          }
        />

        <Dialog.Content
          className={
            cn(
              'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[25rem] outline-none',
              'data-[state=open]:animate-content-show',
              className
            )
          }
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button className="h-12 w-12 flex items-center outline-none" onClick={onClose}>
              <Cross2Icon className="w-6 h-6" />
            </button>

            <span className="text-lg tracking-[-1px] font-bold">
              {title}
            </span>

            <button className="h-12 w-12 flex items-center">
              {rightAction}
            </button>
          </header>

          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
