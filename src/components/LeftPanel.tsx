import { Sun, Moon, Monitor, CheckCircle, Lock } from '@phosphor-icons/react'
import { LangSelect } from './LangSelect'
import type { LangType, ThemeType } from '../types'
import type { Translations } from '../i18n'

interface LeftPanelProps {
  lang: LangType
  theme: ThemeType
  t: Translations
  isMaintenance: boolean
  onLangChange: (l: LangType) => void
  onThemeChange: (t: ThemeType) => void
}

/** Left split-screen panel: branding, hero copy, features, controls, and footer note. */
export function LeftPanel({ lang, theme, t, isMaintenance, onLangChange, onThemeChange }: LeftPanelProps) {
  return (
    <div className="w-full md:w-5/12 lg:w-1/2 md:h-full md:overflow-y-auto p-6 sm:p-10 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 shrink-0">
      <div>
        {/* Top bar: brand + controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16">
          <div className="flex items-center select-none">
            <svg className="w-8 h-8 fill-stone-900 dark:fill-stone-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 -1380 1000 2000">
              <path d="M616 720Q716 719 800 678Q885 638 944 567Q886 689 774 763Q662 837 518 839Q318 834 185 701Q52 568 47 368Q50 197 152 73Q253 -51 414 -90Q423 -94 433 -96Q443 -99 454 -101Q419 -75 399 -37Q378 2 378 47Q380 126 432 179Q485 232 564 234Q643 232 696 179Q748 126 750 47Q750 47 750 46Q763 72 769 101Q776 130 776 161Q773 276 697 351Q622 427 507 430Q393 427 318 351Q242 276 239 161Q239 129 246 98Q253 68 267 41Q229 94 208 157Q187 220 187 290Q192 473 313 594Q434 715 616 720Z" transform="scale(1,-1)" />
            </svg>
            <span className="text-xl font-semibold tracking-wide">HqHelper</span>
          </div>

          <div className="flex items-center gap-3">
            <LangSelect value={lang} onChange={onLangChange} />

            {/* Theme toggle */}
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
                  className={`p-1.5 rounded-lg transition-colors ${
                    theme === mode
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                      : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-stone-900 dark:text-white">
            {t.title} <br />
            <span className="text-stone-400 dark:text-stone-500 font-normal">{t.subtitle}</span>
          </h1>

          <p className="text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-lg">
            {t.description}
          </p>

          {/* Feature list */}
          <div className="pt-6 space-y-4">
            {[t.feature1, t.feature2, t.feature3].map((feat, i) => (
              <div key={i} className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer area */}
      <div className="mt-16 space-y-6">
        {isMaintenance && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">{t.maintenanceTitle}</h4>
              <p className="text-xs text-amber-700/80 dark:text-amber-300/80 leading-relaxed">{t.maintenanceDesc}</p>
            </div>
          </div>
        )}
        <div className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed max-w-full">
          <p>{t.footerNote1}</p>
          <p>{t.footerNote2}</p>
        </div>
      </div>
    </div>
  )
}
