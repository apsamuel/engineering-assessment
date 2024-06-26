import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
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
    children: []
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={browserRouter}
      style={{
      }}
    />
      <App />
  </React.StrictMode>,
)
