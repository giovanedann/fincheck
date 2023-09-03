import { ExitIcon } from '@radix-ui/react-icons'
import { Dropdown } from '.'
import { useAuth } from 'app/hooks/useAuth'

type UserMenuProps = {
  name: string
}

export function UserMenu({ name }: UserMenuProps) {
  const { signOut } = useAuth()

  const [firstName, secondName] = name.split(' ')
  const initials = `${firstName[0]}${secondName?.[0] ?? ''}`.trim()

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <div className="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border border-teal-200">
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            {initials}
          </span>
        </div>
      </Dropdown.Trigger>

      <Dropdown.Content className="w-32 mt-2 mr-2" side="bottom">
        <Dropdown.Item className="justify-between" onSelect={signOut}>
          Logout
          <ExitIcon className="w-4 h-4" />
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
