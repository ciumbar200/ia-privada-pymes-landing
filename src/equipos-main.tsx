import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { EquiposPage } from './pages/EquiposPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EquiposPage />
  </StrictMode>,
)
