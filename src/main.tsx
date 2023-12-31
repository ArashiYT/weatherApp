import { ThemeProvider } from './components/ThemeProvider.tsx'
import ReactDOM from 'react-dom/client'
import "./assets/css/Document.css"
import App from './App.tsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
