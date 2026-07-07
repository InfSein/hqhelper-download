import { DownloadSimple, Lock } from '@phosphor-icons/react'
import type { DownloadLinkItem } from '../types'

interface DownloadLinksProps {
  links: DownloadLinkItem[]
  maintenanceTitle: string
  isMaintenance: boolean
}

/** Renders the download buttons for a card, or a locked state during maintenance. */
export function DownloadLinks({ links, maintenanceTitle, isMaintenance }: DownloadLinksProps) {
  if (isMaintenance) {
    return (
      <button
        disabled
        className="w-full bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <Lock className="w-4 h-4" /> {maintenanceTitle}
      </button>
    )
  }

  return (
    <>
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`py-2.5 px-4 rounded-xl text-center text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
            link.isPrimary
              ? 'bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 shadow-sm flex-1'
              : 'border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
          }`}
        >
          {link.isPrimary && <DownloadSimple className="w-4 h-4" />}
          {link.label}
        </a>
      ))}
    </>
  )
}
