import type { ReactNode } from 'react'
import type { DownloadLinkItem } from '../types'
import { DownloadLinks } from './DownloadLinks'
import { MacWarningPopover } from './MacWarningPopover'

const VERSION_BADGE = "text-xs font-mono bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700"

interface DownloadCardProps {
  /** Platform icon element */
  icon: ReactNode
  /** Icon wrapper background / text color class */
  iconClass: string
  /** Card title */
  title: string
  /** Card description */
  description: string
  /** Version string shown in the badge */
  version: string
  /** Download links to render */
  links: DownloadLinkItem[]
  /** Maintenance lock state */
  isMaintenance: boolean
  maintenanceTitle: string
  /** Optional: macOS warning popover props */
  macWarning?: {
    title: string
    warning: string
    viewFix: string
  }
}

/** Generic download card used for each platform. */
export function DownloadCard({
  icon,
  iconClass,
  title,
  description,
  version,
  links,
  isMaintenance,
  maintenanceTitle,
  macWarning,
}: DownloadCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 transition-all hover:shadow-lg dark:hover:shadow-black/30 duration-300">
      {/* Top row: icon + version badge */}
      <div className="flex items-center justify-between mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconClass}`}>
          {icon}
        </div>
        <span className={VERSION_BADGE}>{version}</span>
      </div>

      {/* Title (with optional macOS popover) */}
      <div className="flex items-center mb-1">
        <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
        {macWarning && (
          <MacWarningPopover
            title={macWarning.title}
            warning={macWarning.warning}
            viewFix={macWarning.viewFix}
          />
        )}
      </div>

      <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">{description}</p>

      {/* Download buttons */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-2.5">
        <DownloadLinks
          links={links}
          isMaintenance={isMaintenance}
          maintenanceTitle={maintenanceTitle}
        />
      </div>
    </div>
  )
}
