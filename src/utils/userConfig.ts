import type { LangType, ThemeType } from '../types'

export const STORAGE_KEY_LANG = 'hqhelper_lang'
export const STORAGE_KEY_THEME = 'hqhelper_theme'
export const STORAGE_KEY_INITED = 'hqhelper_inited'

export const VALID_LANGS: readonly LangType[] = ['zh', 'en', 'ja']
export const VALID_THEMES: readonly ThemeType[] = ['light', 'dark', 'system']

/** 获取持久化配置中的 inited 状态，默认为 false */
export function getIsInited(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY_INITED) === 'true'
}

/** 设置持久化配置中的 inited 状态 */
export function setIsInited(inited = true): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY_INITED, inited ? 'true' : 'false')
}

/** 获取持久化保存的语言配置 */
export function getSavedLanguage(): LangType | null {
  if (typeof window === 'undefined') return null
  const saved = localStorage.getItem(STORAGE_KEY_LANG) as LangType
  return saved && VALID_LANGS.includes(saved) ? saved : null
}

/** 持久化保存语言配置 */
export function setSavedLanguage(lang: LangType): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY_LANG, lang)
}

/** 获取持久化保存的主题配置 */
export function getSavedTheme(): ThemeType | null {
  if (typeof window === 'undefined') return null
  const saved = localStorage.getItem(STORAGE_KEY_THEME) as ThemeType
  return saved && VALID_THEMES.includes(saved) ? saved : null
}

/** 持久化保存主题配置 */
export function setSavedTheme(theme: ThemeType): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY_THEME, theme)
}

/** 将主题类应用到 <html> 根节点 */
export function applyTheme(theme: ThemeType): void {
  if (typeof window === 'undefined') return
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.add(prefersDark ? 'dark' : 'light')
  } else {
    root.classList.add(theme)
  }
}

/** 推导初始语言设置 */
export function detectInitialLang(): LangType {
  const saved = getSavedLanguage()
  if (saved) return saved
  if (typeof navigator !== 'undefined') {
    const nav = navigator.language.toLowerCase()
    if (nav.startsWith('zh')) return 'zh'
    if (nav.startsWith('ja')) return 'ja'
  }
  return 'en'
}

/** 获取当前完整的用户配置 */
export function getUserConfig(): import('../types').UserConfig {
  return {
    lang: detectInitialLang(),
    theme: getSavedTheme() ?? 'system',
    inited: getIsInited(),
  }
}

/**
 * 在应用入口检查 URL 查询参数并初始化用户配置：
 * - 若 inited 为 false，根据 url 参数配置语言和主题，并将 inited 设为 true；
 * - 若 inited 已为 true，则不调整配置；
 * - 处理完成后清理 url 中的相关 params，保持 url 整洁。
 */
export function initUserConfigFromUrl(): void {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  const keysToDelete: string[] = []
  let targetLang: LangType | null = null
  let targetTheme: ThemeType | null = null

  // 遍历查询参数，进行大小写无关的匹配
  url.searchParams.forEach((value, key) => {
    const lowerKey = key.toLowerCase()
    if (lowerKey === 'lang') {
      keysToDelete.push(key)
      const val = value.toLowerCase()
      if (VALID_LANGS.includes(val as LangType)) {
        targetLang = val as LangType
      }
    } else if (lowerKey === 'theme') {
      keysToDelete.push(key)
      const val = value.toLowerCase()
      if (VALID_THEMES.includes(val as ThemeType)) {
        targetTheme = val as ThemeType
      }
    }
  })

  // 如果链接中携带了 lang 或 theme 参数
  if (keysToDelete.length > 0) {
    const inited = getIsInited()
    if (!inited) {
      if (targetLang) {
        setSavedLanguage(targetLang)
      }
      if (targetTheme) {
        setSavedTheme(targetTheme)
        applyTheme(targetTheme)
      }
      setIsInited(true)
    }

    // 清理 params，保持 url 整洁
    keysToDelete.forEach((key) => url.searchParams.delete(key))
    const newSearch = url.searchParams.toString()
    const cleanUrl = url.pathname + (newSearch ? `?${newSearch}` : '') + url.hash
    window.history.replaceState(null, '', cleanUrl)
  }
}
