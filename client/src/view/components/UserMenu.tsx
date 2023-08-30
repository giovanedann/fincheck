type UserMenuProps = {
  name: string
}

export function UserMenu({ name }: UserMenuProps) {
  const [firstName, secondName] = name.split(' ')

  const initials = `${firstName[0]}${secondName?.[0] ?? ''}`.trim()

  return (
    <div className="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border border-teal-200">
      <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
        {initials}
      </span>
    </div>
  )
}
