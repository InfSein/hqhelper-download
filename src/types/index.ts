// ─── Domain types shared across the app ───────────────────────────────────────

export interface VersionInfo {
  /** Electron client version (shared by Windows & macOS). */
  electron: string
  /** Android client version. */
  android: string
  /** Raw download links. Replace ~PROXY and ~VERSION before use. */
  download_link: {
    electron_win: string
    electron_mac: string
    android: string
  }
  /** Recommended proxy prefix for domestic users. */
  recomm_proxy: string
  /** Alternate (domestic) download links per platform. */
  client_info: {
    win_sub_links: string[]
    mac_sub_links: string[]
    android_sub_links: string[]
  }
  /** When true, all download buttons are locked. */
  maintenancing: boolean
}

export type LangType = 'zh' | 'en' | 'ja'
export type ThemeType = 'light' | 'dark' | 'system'
export type Platform = 'win' | 'mac' | 'android'

export interface DownloadLinkItem {
  label: string
  url: string
  isPrimary: boolean
}
