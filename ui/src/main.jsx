import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import Visualize from './components/Visualize.jsx'
// import Trucks from './components/Trucks.jsx'
// import Reviews from './components/Reviews.jsx'
// import About from './components/About.jsx'
// TODO: document SiteConfiguration.js
import { navigationLinks } from './components/config/SiteConfiguration.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AnimatedRoute from './components/components/AnimatedRoute.jsx'

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(App),
    children: navigationLinks.map((link) => {
      return {
        path: link.path,
        // element: link.element,
        element: React.createElement(AnimatedRoute, {}, link.element),
        children: link.children
      }
    })
    // children: [
    //   {
    //     path: 'viz',
    //     element: React.createElement(Visualize),
    //     children: []
    //   },
    //   {
    //     path: 'trucks',
    //     element: React.createElement(Trucks),
    //     children: []
    //   },
    //   {
    //     path: 'reviews',
    //     element: React.createElement(Reviews),
    //     children: []
    //   },
    //   {
    //     path: 'about',
    //     element: React.createElement(About),
    //     children: []
    //   }
    // ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      id='RouterProvider'
      className='RouterClass'
      router={browserRouter}
    />
  </React.StrictMode>,
)
