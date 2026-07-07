import type { LangType } from '../types'

// ─── i18n translation strings ─────────────────────────────────────────────────

export const translations = {
  zh: {
    pageTitle: 'HqHelper客户端下载',
    title: 'HqHelper 客户端',
    subtitle: '可靠的可选项',
    description:
      'HqHelper 的大多数功能在网页端即可完成。不过，为了满足部分用户的习惯和实现一些浏览器无法完成的功能，我们也提供客户端服务。',
    feature1: '无需联网即可获得基础计算服务',
    feature2: '可置顶的采集时钟窗口（仅限Windows・MacOS）',
    feature3: '以单独窗口打开工作流的推荐流程（仅限Windows・MacOS）',
    footerNote1:
      '您可以收藏此页面，以便在未来方便地下载到最新版本的客户端。',
    footerNote2:
      '客户端仅是搭载 HqHelper 的“容器”，下载最新版本后可能仍需要更新一次 HqHelper 的版本。',
    winTitle: 'Windows 客户端',
    winDesc: '需要 Windows 7 或更高版本的系统',
    macTitle: 'Mac OS 客户端',
    macDesc: '需要 10.13 或更高版本的 Mac OS，并且仅限M系列芯片的设备使用',
    androidTitle: 'Android 客户端',
    androidDesc: '需要 Android 7.0 或更高版本的系统',
    moreTitle: '更多平台支持',
    moreDesc: '未来我们还将继续拓展 HqHelper 的可用平台，敬请期待！',
    macWarning:
      '我们暂时没有能力提供 Apple 开发者签名，安装时可能会提示「"HqHelper"已损坏，无法打开。你应该将它移到废纸篓」。你需要解除安全检查限制或是将 HqHelper 添加到白名单方可成功安装。',
    macWarningTitle: '安装注意事项',
    viewFix: '查看解决办法',
    domestic1: '国内下载链接 1',
    domestic2Prefix: '国内下载链接',
    intlDownload: '国际下载链接',
    download: '下载',
    maintenanceTitle: '系统维护中',
    maintenanceDesc: '下载通道暂时关闭，技术团队正在对客户端下载服务进行升级维护，请稍后再试。',
    loading: '正在加载配置...',
    loadError: '获取版本配置失败，请刷新页面重试。',
    system: '跟随系统',
    light: '浅色模式',
    dark: '深色模式',
    selectLang: '语言选择',
    themeLabel: '主题',
  },
  en: {
    pageTitle: 'HqHelper Client Download',
    title: 'HqHelper Client',
    subtitle: 'Optional but reliable',
    description:
      'Most features of HqHelper can be used directly in the web browser. However, to accommodate user preferences and deliver functionality beyond browser capabilities, we also offer a dedicated client application.',
    feature1: 'Access basic calculation services without an internet connection',
    feature2: 'Pin timer window on top (Windows & macOS only)',
    feature3: 'Recommended workflow to open in a separate window (Windows & macOS only)',
    footerNote1:
      'Feel free to bookmark this page for future updates.',
    footerNote2:
      'The client is a container and may require further self-updates inside after downloading.',
    winTitle: 'Windows Client',
    winDesc: 'Requires Windows 7 or higher',
    macTitle: 'macOS Client',
    macDesc: 'Requires macOS 10.13 or higher, Apple Silicon (M-series) devices only',
    androidTitle: 'Android Client',
    androidDesc: 'Requires Android 7.0 or higher',
    moreTitle: 'More Platforms',
    moreDesc: 'We will continue to expand the supported platforms for HqHelper in the future. Stay tuned!',
    macWarning:
      'Without Apple Developer signing, installation may alert "HqHelper is damaged and cannot be opened." You need to bypass gatekeeper security restrictions or add HqHelper to your whitelist.',
    macWarningTitle: 'Installation Notice',
    viewFix: 'Learn How to Fix',
    intlDownload: 'Download',
    download: 'Download',
    maintenanceTitle: 'Under Maintenance',
    maintenanceDesc: 'Downloads are temporarily unavailable due to system upgrades. Please try again later.',
    loading: 'Loading configuration...',
    loadError: 'Failed to load version details. Please refresh.',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    selectLang: 'Language',
    themeLabel: 'Theme',
  },
  ja: {
    pageTitle: 'HqHelperクライアントダウンロード',
    title: 'HqHelper クライアント',
    subtitle: '信頼できるオプションツール',
    description:
      'HqHelper のほとんどの機能はウェブブラウザ上で利用可能です。しかし、一部のユーザーの習慣に対応し、ブラウザでは実現できない機能を提供するために、クライアントサービスも提供しています。',
    feature1: 'インターネット接続なしで基礎計算サービスを利用可能',
    feature2: '採集時計の最上部表示（Windows・macOS限定）',
    feature3: 'ワークフローの推奨回しを単独のウィンドウで開く（Windows・macOS限定）',
    footerNote1:
      '今後のアップデートのためにこのページをブックマークしてください。',
    footerNote2:
      'クライアントはコンテナであり、ダウンロード後に内部で更新が必要な場合があります。',
    winTitle: 'Windows クライアント',
    winDesc: 'Windows 7 以降が必要',
    macTitle: 'macOS クライアント',
    macDesc: 'macOS 10.13 以降が必要、かつApple Silicon（Mシリーズ）搭載デバイス限定',
    androidTitle: 'Android クライアント',
    androidDesc: 'Android 7.0 以降のシステムが必要',
    moreTitle: '他のプラットフォーム',
    moreDesc: '将来的にはさらに多くのプラットフォームへ HqHelper を展開していく予定です。ご期待ください！',
    macWarning:
      'Apple 開発者署名がないため、インストール時に「HqHelperは壊れています。開けません。」と表示される場合があります。セキュリティ制限を解除するか、ホワイトリストに追加してください。',
    macWarningTitle: 'インストール注意事項',
    viewFix: '解決方法を確認する',
    intlDownload: 'ダウンロード',
    download: 'ダウンロード',
    maintenanceTitle: 'メンテナンス中',
    maintenanceDesc: 'システムアップグレードのため、ダウンロードは一時的にご利用いただけません。後ほどお試しください。',
    loading: '構成を読み込み中...',
    loadError: 'バージョン構成の取得に失敗しました。再試行してください。',
    system: 'システム',
    light: 'ライト',
    dark: 'ダーク',
    selectLang: '言語',
    themeLabel: 'テーマ',
  },
} as const

export type Translations = typeof translations[LangType]

/** Available language options for the language selector. */
export const LANG_OPTIONS: { value: LangType; label: string }[] = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
]
