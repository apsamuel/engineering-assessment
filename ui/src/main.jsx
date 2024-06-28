import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Visualize from './components/Visualize.jsx'
import Trucks from './components/Trucks.jsx'
import Reviews from './components/Reviews.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'viz',
        element: <Visualize />,
        children: []
      },
      {
        path: 'trucks',
        element: <Trucks />,
        children: []
      },
      {
        path: 'reviews',
        element: <Reviews />,
        children: []
      }
    ]
  },
])
/*
  render elements within root div
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      id='RouterProvider'
      className='RouterClass'
      router={browserRouter}
    />
  </React.StrictMode>,
)
