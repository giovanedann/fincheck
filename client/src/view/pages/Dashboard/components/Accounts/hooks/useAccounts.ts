import { useState } from 'react'
import { useDashboard } from 'view/pages/Dashboard/hooks/useDashboard'

export function useAccounts() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })

  const { areValuesVisible, toggleValuesVisibility } = useDashboard()

  return {
    sliderState,
    setSliderState,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: false,
    accounts: []
  }
}
