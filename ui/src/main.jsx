import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: []
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={browserRouter}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'flex',

      }}
    />
    <App />
  </React.StrictMode>,
)
