import React from 'react'
import Visualize from '../Visualize.jsx'
import Trucks from '../Trucks.jsx'
import Reviews from '../Reviews.jsx'
import About from '../About.jsx'

const navigationLinks = [
  {
    path: 'trucks',
    name: 'Trucks',
    to: 'trucks',
    element: React.createElement(Trucks),
    position: 1,
    children: []
  },
  {
    path: 'viz',
    name: 'Visualize',
    to: 'viz',
    element: React.createElement(Visualize),
    position: 2,
    children: []
  },
  {
    path: 'reviews',
    name: 'Reviews',
    to: 'reviews',
    element: React.createElement(Reviews),
    position: 3,
    children: []
  },
  {
    path: 'about',
    name: 'About',
    to: 'about',
    element: React.createElement(About),
    position: 4,
    children: []
  }
];

export {
  navigationLinks
}