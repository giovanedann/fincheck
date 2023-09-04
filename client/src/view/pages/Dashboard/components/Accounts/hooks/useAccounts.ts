import { useState } from 'react'
import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard'

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

  return {
    sliderState,
    setSliderState,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal
  }
}
