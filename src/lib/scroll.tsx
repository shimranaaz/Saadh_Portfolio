import { useEffect } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from './hooks'

let lenis: Lenis | null = null

export function scrollToTarget(target: string | HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 })
    return
  }
  const el =
    typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'auto', block: 'start' })
}

export function stopScroll() {
  lenis?.stop()
}

export function startScroll() {
  lenis?.start()
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return null
}