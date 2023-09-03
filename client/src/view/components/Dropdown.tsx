import * as RdxDropdown from '@radix-ui/react-dropdown-menu'
import { cn } from 'app/utils/cn'
import { ReactNode } from 'react'

type DropdownComponentsBaseProps = {
  children: ReactNode
  className?: string
}

function Root({ children }: DropdownComponentsBaseProps) {
  return (
    <RdxDropdown.Root>
      {children}
    </RdxDropdown.Root>
  )
}

function Trigger({ children }: DropdownComponentsBaseProps) {
  return (
    <RdxDropdown.Trigger className="outline-none">
      {children}
    </RdxDropdown.Trigger>
  )
}

type ContentProps = DropdownComponentsBaseProps & {
  side?: 'left' | 'bottom' | 'right' | 'top'
}

function Content({ children, className, side = 'bottom' }: ContentProps) {
  return (
    <RdxDropdown.Portal>
      <RdxDropdown.Content
        side={side}
        className={
          cn(
            'p-2 rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
            className,
            side === 'top' && 'data-[side=top]:animate-slide-down-and-fade',
            side === 'right' && 'data-[side=right]:animate-slide-left-and-fade',
            side === 'bottom' && 'data-[side=bottom]:animate-slide-up-and-fade',
            side === 'left' && 'data-[side=left]:animate-slide-right-and-fade',
          )
        }
      >
        {children}
      </RdxDropdown.Content>
    </RdxDropdown.Portal>
  )
}

type ItemProps = DropdownComponentsBaseProps & {
  onSelect?: () => void
}

function Item({ children, className, onSelect }: ItemProps) {
  return (
    <RdxDropdown.Item
      onSelect={onSelect}
      className={
        cn(
          'min-h-[3rem] outline-none flex items-center p-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 cursor-pointer rounded-2xl transition-all duration-300 ease-in-out',
          className
        )}
    >
      {children}
    </RdxDropdown.Item>
  )
}

export const Dropdown = {
  Root,
  Trigger,
  Content,
  Item
}
