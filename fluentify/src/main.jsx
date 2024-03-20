import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router}/>
    </LanguageProvider>
  </React.StrictMode>,
)
