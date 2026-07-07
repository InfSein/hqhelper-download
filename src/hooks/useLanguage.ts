import { useState } from 'react'
import type { LangType } from '../types'

const STORAGE_KEY = 'hqhelper_lang'
const VALID: LangType[] = ['zh', 'en', 'ja']

function detectInitialLang(): LangType {
  const saved = localStorage.getItem(STORAGE_KEY) as LangType
  if (saved && VALID.includes(saved)) return saved
  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('zh')) return 'zh'
  if (nav.startsWith('ja')) return 'ja'
  return 'en'
}

/** Manages the current language and persists the selection to localStorage. */
export function useLanguage() {
  const [lang, setLang] = useState<LangType>(detectInitialLang)

  const changeLanguage = (newLang: LangType) => {
    setLang(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
  }

  return { lang, changeLanguage }
}
