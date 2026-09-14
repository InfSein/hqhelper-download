import { useState, useEffect } from 'react'
import type { ThemeType } from '../types'
import {
  applyTheme,
  getSavedTheme,
  setSavedTheme,
  setIsInited,
} from '../utils/userConfig'

/** 管理当前主题，应用到 <html> 并持久化到本地存储，用户手动修改时将 inited 设为 true */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return getSavedTheme() ?? 'system'
  })

  // 当 theme 改变时应用样式类名
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // 监听系统深浅色偏好变化（仅在 system 模式下生效）
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') applyTheme('system')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
    setSavedTheme(newTheme)
    setIsInited(true)
  }

  return { theme, changeTheme }
}

