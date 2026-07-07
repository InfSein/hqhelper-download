import { useEffect } from 'react'
import { Spinner, WarningCircle } from '@phosphor-icons/react'
import { translations } from './i18n'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'
import { useVersionInfo } from './hooks/useVersionInfo'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'
import { MobileTopBar } from './components/MobileTopBar'

function App() {
  const { lang, changeLanguage } = useLanguage()
  const { theme, changeTheme } = useTheme()
  const { versionInfo, loading, error } = useVersionInfo()

  const t = translations[lang]

  useEffect(() => {
    document.title = t.pageTitle
  }, [t.pageTitle])

  if (loading) {
    return (
      <div className="min-h-dvh bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center text-stone-600 dark:text-stone-400">
        <Spinner className="w-8 h-8 animate-spin mb-4" />
        <span className="text-sm font-medium">{t.loading}</span>
      </div>
    )
  }

  if (error || !versionInfo) {
    return (
      <div className="min-h-dvh bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center text-red-500 p-6 text-center">
        <WarningCircle className="w-12 h-12 mb-4" />
        <p className="font-semibold text-lg">{t.loadError}</p>
      </div>
    )
  }

  return (
    <div className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col md:flex-row md:h-dvh antialiased overflow-x-clip">
      {/* Mobile sticky top bar */}
      <MobileTopBar
        lang={lang}
        theme={theme}
        t={t}
        onLangChange={changeLanguage}
        onThemeChange={changeTheme}
      />

      <LeftPanel
        lang={lang}
        theme={theme}
        t={t}
        isMaintenance={versionInfo.maintenancing}
        onLangChange={changeLanguage}
        onThemeChange={changeTheme}
      />
      <RightPanel
        versionInfo={versionInfo}
        lang={lang}
        t={t}
      />
    </div>
  )
}

export default App
