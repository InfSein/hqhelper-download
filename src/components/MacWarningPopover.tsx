import { useState, useEffect, useRef } from 'react'
import { WarningCircle, ArrowRight, X } from '@phosphor-icons/react'

interface MacWarningPopoverProps {
  title: string
  warning: string
  viewFix: string
}

/** On desktop: hover-triggered popover. On mobile: tap-triggered bottom drawer. */
export function MacWarningPopover({ title, warning, viewFix }: MacWarningPopoverProps) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)

  // Detect mobile breakpoint (< 768px = md)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  const handleMouseEnter = () => {
    if (isMobile) return
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    timeoutRef.current = window.setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  const handleClick = () => {
    if (isMobile) {
      setOpen(o => !o)
    }
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  // Close on outside click (desktop popover)
  useEffect(() => {
    if (isMobile) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isMobile])

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobile, open])

  const drawerContent = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <WarningCircle className="w-4 h-4 text-amber-500 shrink-0" weight="fill" />
          <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">{title}</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors focus:outline-none shrink-0 -mt-0.5"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        {warning}
      </p>

      {/* Link */}
      <div className="flex justify-end">
        <a
          href="https://zhuanlan.zhihu.com/p/135948430"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline underline-offset-2 transition-colors"
        >
          {viewFix} <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* Trigger button */}
      <div
        ref={ref}
        className="relative inline-flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={handleClick}
          onFocus={!isMobile ? handleMouseEnter : undefined}
          onBlur={!isMobile ? handleMouseLeave : undefined}
          aria-label={title}
          aria-expanded={open}
          className="ml-2 text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
        >
          <WarningCircle className="w-4.5 h-4.5" weight={open ? 'fill' : 'regular'} />
        </button>

        {/* Desktop popover */}
        {!isMobile && (
          <div
            className={`absolute left-0 top-full mt-2 z-50 w-[320px] min-w-[260px] rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-white dark:bg-stone-900 shadow-xl shadow-amber-500/25 dark:shadow-black/50 p-4 transition-all duration-200 ease-out origin-top-left ${
              open
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 -translate-y-1.5 scale-95 pointer-events-none'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <WarningCircle className="w-4 h-4 text-amber-500 shrink-0" weight="fill" />
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{title}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors focus:outline-none shrink-0 -mt-0.5"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Body */}
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
              {warning}
            </p>

            {/* Link */}
            <div className="flex justify-end">
              <a
                href="https://zhuanlan.zhihu.com/p/135948430"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline underline-offset-2 transition-colors"
              >
                {viewFix} <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Mobile bottom drawer */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-sm transition-opacity duration-300 ${
              open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-stone-900 rounded-t-3xl border-t border-stone-200 dark:border-stone-800 shadow-2xl shadow-black/30 p-6 pb-8 transition-transform duration-300 ease-out ${
              open ? 'translate-y-0' : 'translate-y-full'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {drawerContent}
          </div>
        </>
      )}
    </>
  )
}
