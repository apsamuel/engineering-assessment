// import { useState } from 'react';
// import truckLogo from './assets/truck.svg'
// import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react';
import { useGeolocation } from "@uidotdev/usehooks";
import Stack from '@mui/material/Stack';
import Navigation from './components/Navigation';
import Data from './components/Data';
import Form from './components/Form';
// import haversine from 'haversine-distance'

import './App.css';

function App() {

  const [trucks, setTrucks] = useState([]);
  const [browserLocation, setBrowserLocation] = useState([]);
  // const [distance, setDistance] = useState(100);

  const { loading, error, longitude, latitude } = useGeolocation();
  if (loading) console.log('loading location...')
  if (error) console.log('error getting location')

  useEffect(() => {
    fetch('http://localhost:8080/api/trucks')
      .then((res) => res.json())
      .then((data) => {
        data = data
          .map((truck) => {
            return {
              ...truck,
              id: truck[':id']
            };
          })
          .filter(
            (truck) =>
              // we want recently approved trucks
              new Date(truck.approved).getFullYear() >= 2023 &&
              // we want applicants who took the care to list their food items
              truck.fooditems !== null &&
              // we want trucks with a valid id
              truck.id &&
              // we want trucks with a valid applicant
              truck.applicant &&
              // we want trucks with a valid latitude and longitude
              truck.latitude && truck.latitude !== '0' &&
              truck.longitude && truck.longitude !== '0'
          );
        setTrucks(data);
      });

    if (latitude && longitude) {
      setBrowserLocation([latitude, longitude])
    }
  }, [latitude, longitude]);

  return (
    <Stack>
      <Stack
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Navigation />
        <Stack

          spacing={2}
          style={{
            position: 'absolute',
            top: '20%'
          }}
          direction='column'
        >
          <Form trucks={trucks}/>
          <Data trucks={trucks} location={browserLocation}/>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
