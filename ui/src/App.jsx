// import { useState } from 'react';
// import truckLogo from './assets/truck.svg'
// import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useGeolocation } from "@uidotdev/usehooks";
import Stack from '@mui/material/Stack';
import Navigation from './components/Navigation';
import Data from './components/Data';
import Form from './components/Form';
// import haversine from 'haversine-distance'
import './App.css';

const darkTheme = createTheme({
  foo: 'bar',
  palette: {
    primary: {
      light: '#757575',
      main: '#424242',
      dark: '#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
})

const lightTheme = createTheme({
  bar: 'foo',
  palette: {
    primary: {
      main: '#1976d2'
    }
  }
})

function App() {

  //
  const [theme, setTheme] = useState(darkTheme)
  const [trucks, setTrucks] = useState([]);
  const [browserLocation, setBrowserLocation] = useState([]);
  // set the distance to 10,000 km for now...
  const [distance, setDistance] = useState(10000);
  const [vendor, setVendor] = useState(null);
  const [foods, setFoods] = useState(null);

  const { loading, error, longitude, latitude } = useGeolocation();
  if (loading) console.log('loading location...')
  if (error) console.log('error getting location')

  // console.log('theme: ', theme)
  useEffect(() => {
    fetch('http://localhost:3000/api/trucks')
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

    // if (theme === 'dark') {
    //  //
    // }
  }, [latitude, longitude]);

  return (
    <ThemeProvider theme={darkTheme}>
    <Stack>
      <Stack
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Navigation setTheme={setTheme} lightTheme={lightTheme} darkTheme={darkTheme}/>
        <Stack

          spacing={2}
          style={{
            position: 'absolute',
            top: '20%'
          }}
          direction='column'
        >
          <Form trucks={trucks} setDistance={setDistance} distance={distance} setVendor={setVendor} vendor={vendor} setFoods={setFoods} foods={foods}/>
          <Data trucks={trucks} location={browserLocation} vendor={vendor} distance={distance} foods={foods}/>
        </Stack>
      </Stack>
    </Stack>
    </ThemeProvider>

  );
}

export default App;
