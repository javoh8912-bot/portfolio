'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type LoaderPhase = 'entering' | 'arriving'

function waitForPageAssets() {
  const visibleImages = Array.from(document.images).filter((image) => {
    if (image.complete) return true
    const bounds = image.getBoundingClientRect()
    return bounds.bottom > 0 && bounds.top < window.innerHeight
  })
  const imagesReady = visibleImages.map((image) => image.decode().catch(() => undefined))
  const fontsReady = document.fonts?.ready ?? Promise.resolve()

  return Promise.all([fontsReady, ...imagesReady])
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

export function PageLoader() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [phase, setPhase] = useState<LoaderPhase>('entering')
  const [animationRun, setAnimationRun] = useState(0)
  const [flightTransform, setFlightTransform] = useState('translate(0, 0) scale(1)')
  const navigationPending = useRef(false)
  const loadingVersion = useRef(0)
  const previousPathname = useRef(pathname)
  const phaseRef = useRef<LoaderPhase>('entering')
  const lettersSettled = useRef(false)
  const assetsReady = useRef(false)
  const arrivalTimer = useRef<number | null>(null)

  const changePhase = (nextPhase: LoaderPhase) => {
    phaseRef.current = nextPhase
    setPhase(nextPhase)
  }

  const finishArrival = (version: number) => {
    if (version !== loadingVersion.current || phaseRef.current === 'arriving') return

    const stage = document.querySelector<HTMLElement>('.loader-stage')
    const target = document.querySelector<HTMLElement>('[data-loader-target]')
    if (!stage || !target) {
      setIsVisible(false)
      return
    }

    const stageBounds = stage.getBoundingClientRect()
    const targetBounds = target.getBoundingClientRect()
    const offsetX = targetBounds.left + targetBounds.width / 2 - (stageBounds.left + stageBounds.width / 2)
    const offsetY = targetBounds.top + targetBounds.height / 2 - (stageBounds.top + stageBounds.height / 2)
    const scale = targetBounds.width / stageBounds.width

    setFlightTransform(`translate(${offsetX}px, ${offsetY}px) scale(${scale})`)
    changePhase('arriving')
    window.setTimeout(() => target.classList.add('is-loader-revealed', 'is-loader-arrival'), 650)
    arrivalTimer.current = window.setTimeout(() => {
      if (version === loadingVersion.current) setIsVisible(false)
      window.setTimeout(() => target.classList.remove('is-loader-arrival'), 650)
    }, 780)
  }

  const waitForAssetsAndPaint = async (version: number) => {
    await waitForPageAssets()
    await waitForPaint()
    if (version !== loadingVersion.current) return

    navigationPending.current = false
    assetsReady.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lettersSettled.current = true
      finishArrival(version)
    } else if (lettersSettled.current) {
      finishArrival(version)
    }
  }

  const handleLetterLanding = (index: number, animationName: string) => {
    if (index !== 4 || animationName !== 'loader-letter-land' || phaseRef.current !== 'entering') return
    lettersSettled.current = true
    if (assetsReady.current) finishArrival(loadingVersion.current)
  }

  useEffect(() => {
    let cancelled = false

    const finishLoading = async () => {
      const version = loadingVersion.current
      await waitForAssetsAndPaint(version)
      if (cancelled) return
    }

    const onInitialLoad = () => void finishLoading()
    if (document.readyState === 'complete') {
      onInitialLoad()
    } else {
      window.addEventListener('load', onInitialLoad, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', onInitialLoad)
    }
  }, [])

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    if (!navigationPending.current) return

    let cancelled = false
    const finishNavigation = async () => {
      const version = loadingVersion.current
      await waitForAssetsAndPaint(version)
      if (cancelled) return
    }
    void finishNavigation()

    return () => {
      cancelled = true
    }
  }, [pathname])

  useEffect(() => {
    const startLoading = () => {
      loadingVersion.current += 1
      if (arrivalTimer.current !== null) window.clearTimeout(arrivalTimer.current)
      document.querySelectorAll<HTMLElement>('[data-loader-target]').forEach((target) => {
        target.classList.remove('is-loader-revealed', 'is-loader-arrival')
      })
      assetsReady.current = false
      lettersSettled.current = false
      navigationPending.current = true
      changePhase('entering')
      setAnimationRun((run) => run + 1)
      setIsVisible(true)
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return

      const anchor = event.target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const destination = new URL(anchor.href, window.location.href)
      if (destination.origin !== window.location.origin) return
      if (destination.pathname === window.location.pathname) return
      startLoading()
    }

    const onPopState = () => {
      if (window.location.pathname !== previousPathname.current) startLoading()
    }
    document.addEventListener('click', onDocumentClick, true)
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('click', onDocumentClick, true)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  return (
    <div className={`page-loader phase-${phase}${isVisible ? '' : ' is-leaving'}`} role="status" aria-live="polite">
      <span className="sr-only">Sahifa yuklanmoqda</span>
      <div
        key={animationRun}
        className={`loader-stage phase-${phase}`}
        style={phase === 'arriving' ? { transform: flightTransform } : undefined}
        aria-hidden="true"
      >
        <div className="loader-plaque">
          <span className="loader-word">
            {'JAVOH'.split('').map((letter, index) => (
              <span className="loader-letter" key={`${letter}-${index}`} onAnimationEnd={(event) => handleLetterLanding(index, event.animationName)}>
                {letter}
              </span>
            ))}
          </span>
          <span className="loader-symbol">®</span>
        </div>
      </div>
    </div>
  )
}
