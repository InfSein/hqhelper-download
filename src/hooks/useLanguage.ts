import { useState } from 'react'
import type { LangType } from '../types'
import { detectInitialLang, setSavedLanguage, setIsInited } from '../utils/userConfig'

/** 管理当前语言并持久化到本地存储，用户手动修改时将 inited 设为 true */
export function useLanguage() {
  const [lang, setLang] = useState<LangType>(detectInitialLang)

  const changeLanguage = (newLang: LangType) => {
    setLang(newLang)
    setSavedLanguage(newLang)
    setIsInited(true)
  }

  return { lang, changeLanguage }
}

