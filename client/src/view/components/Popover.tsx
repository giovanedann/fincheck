import * as RdxPopover from '@radix-ui/react-popover'
import { cn } from 'app/utils/cn'
import { ReactNode } from 'react'

type DropdownComponentsBaseProps = {
  children: ReactNode
  className?: string
}

function Root({ children }: DropdownComponentsBaseProps) {
  return (
    <RdxPopover.Root>
      {children}
    </RdxPopover.Root>
  )
}

function Trigger({ children }: DropdownComponentsBaseProps) {
  return (
    <RdxPopover.Trigger asChild>
      {children}
    </RdxPopover.Trigger>
  )
}

type ContentProps = DropdownComponentsBaseProps & {
  side?: 'left' | 'bottom' | 'right' | 'top'
}

function Content({ children, className, side = 'bottom' }: ContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        side={side}
        className={
          cn(
            'z-[70] p-2 rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
            className,
            side === 'top' && 'data-[side=top]:animate-slide-down-and-fade',
            side === 'right' && 'data-[side=right]:animate-slide-left-and-fade',
            side === 'bottom' && 'data-[side=bottom]:animate-slide-up-and-fade',
            side === 'left' && 'data-[side=left]:animate-slide-right-and-fade',
          )
        }
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  )
}

export const Popover = {
  Root,
  Trigger,
  Content
}
