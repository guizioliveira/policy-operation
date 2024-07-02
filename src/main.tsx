import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { createMockServer } from './server/api.ts'
import './global.css'

createMockServer()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
