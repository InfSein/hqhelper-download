import { useState, useEffect, useRef } from 'react'
import { Globe, CaretDown, CaretUp, Check } from '@phosphor-icons/react'
import { LANG_OPTIONS } from '../i18n'
import type { LangType } from '../types'

interface LangSelectProps {
  value: LangType
  onChange: (val: LangType) => void
}

/** Shadcn-style custom language selector with keyboard-accessible dropdown. */
export function LangSelect({ value, onChange }: LangSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = LANG_OPTIONS.find(o => o.value === value)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 select-none"
      >
        <Globe className="w-3.5 h-3.5 text-stone-400" />
        <span>{selected?.label}</span>
        {open
          ? <CaretUp className="w-3 h-3 text-stone-400" />
          : <CaretDown className="w-3 h-3 text-stone-400" />
        }
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1.5 z-50 min-w-32 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-lg shadow-stone-200/60 dark:shadow-black/40 py-1 overflow-hidden"
        >
          {LANG_OPTIONS.map(opt => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-xs font-medium text-left transition-colors
                ${opt.value === value
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                }`}
            >
              {opt.label}
              {opt.value === value && <Check className="w-3 h-3 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
