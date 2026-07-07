import { useState, useEffect } from 'react'
import type { VersionInfo } from '../types'

/** Fetches `/version.json` once and returns the version info with loading/error state. */
export function useVersionInfo() {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/version.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<VersionInfo>
      })
      .then((data) => {
        setVersionInfo(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('[useVersionInfo] Failed to fetch version.json:', err)
        setError(true)
        setLoading(false)
      })
  }, [])

  return { versionInfo, loading, error }
}
