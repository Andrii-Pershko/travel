import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ClientProviders from './components/Providers/ClientProviders.jsx'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientProviders>
      <App />
    </ClientProviders>
  </StrictMode>,
)
