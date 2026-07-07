import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, Monitor, List, X } from '@phosphor-icons/react'
import { LangSelect } from './LangSelect'
import type { LangType, ThemeType } from '../types'
import type { Translations } from '../i18n'

interface MobileTopBarProps {
  lang: LangType
  theme: ThemeType
  t: Translations
  onLangChange: (l: LangType) => void
  onThemeChange: (t: ThemeType) => void
}

/** Mobile-only sticky top bar with HqHelper branding and a slide-down menu for theme/lang controls. */
export function MobileTopBar({ lang, theme, t, onLangChange, onThemeChange }: MobileTopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handler)
    }
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-14 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
        {/* Brand */}
        <div className="flex items-center gap-2 select-none">
          <svg className="w-6 h-6 fill-stone-900 dark:fill-stone-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 -1380 1000 2000">
            <path d="M616 720Q716 719 800 678Q885 638 944 567Q886 689 774 763Q662 837 518 839Q318 834 185 701Q52 568 47 368Q50 197 152 73Q253 -51 414 -90Q423 -94 433 -96Q443 -99 454 -101Q419 -75 399 -37Q378 2 378 47Q380 126 432 179Q485 232 564 234Q643 232 696 179Q748 126 750 47Q750 47 750 46Q763 72 769 101Q776 130 776 161Q773 276 697 351Q622 427 507 430Q393 427 318 351Q242 276 239 161Q239 129 246 98Q253 68 267 41Q229 94 208 157Q187 220 187 290Q192 473 313 594Q434 715 616 720Z" transform="scale(1,-1)" />
          </svg>
          <span className="text-base font-semibold tracking-wide">HqHelper</span>
        </div>

        {/* Menu toggle */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
        </button>
      </header>

      {/* Spacer to push content below the fixed topbar */}
      <div className="md:hidden h-14 shrink-0" />

      {/* Backdrop — starts below the topbar so it never covers it */}
      <div
        className={`md:hidden fixed top-14 inset-x-0 bottom-0 z-40 bg-stone-950/30 backdrop-blur-sm transition-opacity duration-200 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-down menu panel */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-14 left-0 right-0 z-40 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 shadow-xl shadow-stone-900/10 dark:shadow-black/40 transition-all duration-300 ease-out origin-top ${
          menuOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-2 scale-[0.98] pointer-events-none'
        }`}
      >
        <div className="px-5 py-5 space-y-5">
          {/* Language */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
              {t.selectLang}
            </span>
            <LangSelect value={lang} onChange={onLangChange} />
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
              {t.themeLabel}
            </span>
            <div className="flex bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-0.5">
              {(
                [
                  { mode: 'light' as const, Icon: Sun,     label: t.light  },
                  { mode: 'dark'  as const, Icon: Moon,    label: t.dark   },
                  { mode: 'system' as const, Icon: Monitor, label: t.system },
                ] as const
              ).map(({ mode, Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => onThemeChange(mode)}
                  title={label}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === mode
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                      : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
