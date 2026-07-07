import { useState, useEffect } from 'react'
import type { ThemeType } from '../types'

const STORAGE_KEY = 'hqhelper_theme'
const VALID: ThemeType[] = ['light', 'dark', 'system']

function applyTheme(theme: ThemeType) {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.add(prefersDark ? 'dark' : 'light')
  } else {
    root.classList.add(theme)
  }
}

/** Manages the current theme, applies it to <html>, and persists to localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeType
    return saved && VALID.includes(saved) ? saved : 'system'
  })

  // Apply theme class whenever theme changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Re-apply when the OS preference changes (only matters in 'system' mode)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => { if (theme === 'system') applyTheme('system') }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }

  return { theme, changeTheme }
}
