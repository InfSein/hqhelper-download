import { useState, useEffect, useRef } from 'react'
import { WarningCircle, ArrowRight, X } from '@phosphor-icons/react'

interface MacWarningPopoverProps {
  title: string
  warning: string
  viewFix: string
}

/** A hover-triggered popover showing the macOS gatekeeper warning next to a card title. */
export function MacWarningPopover({ title, warning, viewFix }: MacWarningPopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div
      ref={ref}
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label={title}
        className="ml-2 text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
      >
        <WarningCircle className="w-4.5 h-4.5" weight={open ? 'fill' : 'regular'} />
      </button>

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
    </div>
  )
}
