import type { DownloadLinkItem, LangType, Platform, VersionInfo } from '../types'
import { translations } from '../i18n'

/**
 * Builds the list of download link items for a given platform.
 * - Chinese users get: domestic link 1 (via proxy), sub links, international link.
 * - Other users get: only the international link.
 */
export function buildDownloadLinks(
  platform: Platform,
  versionInfo: VersionInfo,
  lang: LangType,
): DownloadLinkItem[] {
  const { rawLink, version, subLinks } = extractPlatformData(platform, versionInfo)
  const domestic1 = rawLink.replace('~PROXY', versionInfo.recomm_proxy).replace('~VERSION', version)
  const international = rawLink.replace('~PROXY', '').replace('~VERSION', version)

  if (lang === 'zh') {
    const links: DownloadLinkItem[] = [
      { label: translations.zh.domestic1, url: domestic1, isPrimary: true },
    ]
    subLinks.forEach((url, idx) => {
      links.push({ label: `${translations.zh.domestic2Prefix} ${idx + 2}`, url, isPrimary: false })
    })
    links.push({ label: translations.zh.intlDownload, url: international, isPrimary: false })
    return links
  }

  return [{ label: translations.en.download, url: international, isPrimary: true }]
}

function extractPlatformData(platform: Platform, v: VersionInfo) {
  switch (platform) {
    case 'win':
      return { rawLink: v.download_link.electron_win, version: v.electron, subLinks: v.client_info.win_sub_links }
    case 'mac':
      return { rawLink: v.download_link.electron_mac, version: v.electron, subLinks: v.client_info.mac_sub_links }
    case 'android':
      return { rawLink: v.download_link.android, version: v.android, subLinks: v.client_info.android_sub_links }
  }
}
