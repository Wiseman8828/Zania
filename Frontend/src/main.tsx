import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { startMockServiceWorker } from './mocks/browser.ts'

if (import.meta.env.MODE === 'development' || import.meta.env.REACT_APP_MOCK_API === 'true') {
  startMockServiceWorker()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
