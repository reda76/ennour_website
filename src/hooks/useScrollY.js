import { useEffect, useState } from 'react'

export function useScrollY() {
  const [y, setY] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      setY(window.scrollY || 0)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return y
}
