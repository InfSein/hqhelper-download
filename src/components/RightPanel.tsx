import { WindowsLogo, AppleLogo, AndroidLogo } from '@phosphor-icons/react'
import { DownloadCard } from './DownloadCard'
import { buildDownloadLinks } from '../utils/links'
import type { LangType, VersionInfo } from '../types'
import type { Translations } from '../i18n'

interface RightPanelProps {
  versionInfo: VersionInfo
  lang: LangType
  t: Translations
}

/** Right split-screen panel: grid of platform download cards. */
export function RightPanel({ versionInfo, lang, t }: RightPanelProps) {
  const isMaintenance = versionInfo.maintenancing

  return (
    <div className="w-full md:w-7/12 lg:w-1/2 md:h-full md:overflow-y-auto p-6 sm:p-10 md:p-16 bg-stone-100/50 dark:bg-stone-900/20 flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto w-full md:pt-48">

        {/* Windows */}
        <DownloadCard
          icon={<WindowsLogo className="w-6 h-6" />}
          iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          title={t.winTitle}
          description={t.winDesc}
          version={versionInfo.electron}
          links={buildDownloadLinks('win', versionInfo, lang)}
          isMaintenance={isMaintenance}
          maintenanceTitle={t.maintenanceTitle}
        />

        {/* macOS */}
        <DownloadCard
          icon={<AppleLogo className="w-6 h-6" />}
          iconClass="bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-200"
          title={t.macTitle}
          description={t.macDesc}
          version={versionInfo.electron}
          links={buildDownloadLinks('mac', versionInfo, lang)}
          isMaintenance={isMaintenance}
          maintenanceTitle={t.maintenanceTitle}
          macWarning={{
            title: t.macWarningTitle,
            warning: t.macWarning,
            viewFix: t.viewFix,
          }}
        />

        {/* Android */}
        <DownloadCard
          icon={<AndroidLogo className="w-6 h-6" />}
          iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          title={t.androidTitle}
          description={t.androidDesc}
          version={versionInfo.android}
          links={buildDownloadLinks('android', versionInfo, lang)}
          isMaintenance={isMaintenance}
          maintenanceTitle={t.maintenanceTitle}
        />

        {/* More platforms placeholder */}
        <div className="border border-dashed border-stone-300 dark:border-stone-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-stone-400 dark:text-stone-600">
          <span className="font-semibold mb-1">{t.moreTitle}</span>
          <p className="text-xs max-w-[30ch] leading-relaxed">{t.moreDesc}</p>
        </div>

      </div>
    </div>
  )
}
