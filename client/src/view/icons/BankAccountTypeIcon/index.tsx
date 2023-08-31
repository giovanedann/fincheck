import { iconsMap } from "./iconsMap"

type BankAccountTypeIcon = {
  type: keyof typeof iconsMap
}

export function BankAccountTypeIcon({ type }: BankAccountTypeIcon) {
  const Icon = iconsMap[type]

  return <Icon />
}
