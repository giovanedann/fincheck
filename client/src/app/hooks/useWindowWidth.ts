import { useCallback, useEffect, useState } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return width;
}
