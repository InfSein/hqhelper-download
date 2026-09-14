import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { initUserConfigFromUrl } from './utils/userConfig'

// 在应用挂载前解析 URL 参数配置并清理 URL
initUserConfigFromUrl()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

