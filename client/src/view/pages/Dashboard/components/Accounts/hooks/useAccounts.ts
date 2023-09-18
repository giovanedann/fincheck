import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import BankAccountService from 'app/data/services/BankAccountService'

import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard'
import { QUERY_KEYS } from 'app/config/queryKeys'

export function useAccounts() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })

  const {
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal
  } = useDashboard()

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.bankAccounts],
    queryFn: () => BankAccountService.get(),
  })

  return {
    sliderState,
    setSliderState,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    openNewAccountModal
  }
}
