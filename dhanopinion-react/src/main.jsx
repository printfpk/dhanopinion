import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from './components/ThemeContext'
import { ArticlesProvider } from './components/ArticlesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ArticlesProvider>
    </ThemeProvider>
  </React.StrictMode>
)
