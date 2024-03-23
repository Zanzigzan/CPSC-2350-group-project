import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext.jsx'
import SecondPage from './SecondPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path:'/second-page',
    element: <SecondPage/>,
    errorElement: <NotFoundPage/>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router}/>
    </LanguageProvider>
  </React.StrictMode>,
)
