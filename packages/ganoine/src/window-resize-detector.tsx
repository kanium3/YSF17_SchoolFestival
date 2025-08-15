// https://qiita.com/GleapPost/items/8db38b93af554a6c69a0

import { useState, useEffect } from 'react'

interface WidthAndHeight {
  width: number
  height: number
}

const useWindowResize = (): WidthAndHeight => {
  const [widthAndHeight, setWidthAndHeight] = useState <WidthAndHeight> ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleResize = () => {
    setWidthAndHeight({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return widthAndHeight
}

export default useWindowResize
