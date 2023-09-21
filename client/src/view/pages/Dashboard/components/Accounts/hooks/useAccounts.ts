import { useMemo, useState } from 'react'

import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard'
import { useBankAccounts } from 'app/hooks/useBankAccounts'

export function useAccounts() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })

  const {
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal,
    openEditAccountModal
  } = useDashboard()

  const { accounts, isFetching } = useBankAccounts()

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    areValuesVisible,
    isLoading: isFetching,
    accounts,
    currentBalance,
    setSliderState,
    openEditAccountModal,
    toggleValuesVisibility,
    openNewAccountModal
  }
}
