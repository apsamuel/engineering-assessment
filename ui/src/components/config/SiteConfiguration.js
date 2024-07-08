import React from 'react'
import Visualize from '../Visualize.jsx'
import Map from '../Map.jsx'
import Reviews from '../Reviews.jsx'
import About from '../About.jsx'
import Me from '../components/Me.jsx'
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

const navigationLinks = [
  {
    path: 'map',
    name: 'Maps',
    description: 'Geolocation Features',
    to: 'map',
    element: React.createElement(Map),
    icon: React.createElement(MapTwoToneIcon),
    position: 1,
    children: []
  },
  {
    path: 'data',
    name: 'Insights',
    description: 'Data Insights',
    to: 'data',
    element: React.createElement(Visualize),
    icon: React.createElement(AnalyticsTwoToneIcon),
    position: 2,
    children: []
  },
  {
    path: 'reviews',
    name: 'Reviews',
    description: 'Vendor Reviews',
    to: 'reviews',
    element: React.createElement(Reviews),
    icon: React.createElement(GradingTwoToneIcon),
    position: 3,
    children: []
  },
  {
    path: 'about',
    name: 'About',
    description: 'About Hungrèe',
    to: 'about',
    element: React.createElement(About),
    icon: React.createElement(InfoTwoToneIcon),
    position: 4,
    children: [
      {
        path: 'me',
        name: 'Me',
        description: 'About Me',
        to: '/about/me',
        element: React.createElement(Me),
        icon: null,
        position: 1,
        children: []

      }
    ]
  }
];

export {
  navigationLinks
}