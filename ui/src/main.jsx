import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Visualize from './components/Visualize.jsx'
import Trucks from './components/Trucks.jsx'
import Reviews from './components/Reviews.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { createTheme, ThemeProvider } from '@mui/material/styles'


// const darkTheme = createTheme({
//   palette: {
//     primary: {
//       light: '#757575',
//       main: '#424242',
//       dark: '#000000',
//       contrastText: '#fff'
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000'
//     }
//   }
// })

// const lightTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2'
//     }
//   }
// })
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
  // {
  //   path: '/viz',
  //   element: <Visualize />,
  //   children: []
  // },
  // {
  //   path: '/trucks',
  //   element: <Trucks />,
  //   children: []
  // },
  // {
  //   path: '/reviews',
  //   element: <Reviews />,
  //   children: []
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={browserRouter}
      style={{
      }}
    />
      {/* <App /> */}
  </React.StrictMode>,
)
