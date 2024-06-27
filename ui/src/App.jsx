import { useState, useEffect, createRef } from 'react';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
import { useGeolocation } from '@uidotdev/usehooks';
import Stack from '@mui/material/Stack';
import Navigation from './components/Navigation';
import Data from './components/Data';
import Form from './components/Form';
import { Outlet } from 'react-router-dom';
import './App.css';



let darkTheme = createTheme({
  mixins: {
    MuiDataGrid: {
      // pinnedBackground: Colors.grey['A700'],
      // containerBackground: Colors.grey['A700'],
    }
  },
  palette: {
    mode: 'dark',
    background: {
      default: Colors.grey[900],
      paper: Colors.grey[900]
    },
    primary: {
      light: Colors.grey[300],
      main: Colors.grey[900],
      dark: Colors.grey[900],
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  }
});

darkTheme = responsiveFontSizes(darkTheme);

let lightTheme = createTheme({
  mixins: {
    MuiDataGrid: {
      // pinnedBackground: Colors.grey['A700'],
      // containerBackground: Colors.grey['A700'],
    }
  },
  palette: {
    mode: 'light',
    background: {
      default: Colors.grey[50],
      paper: Colors.grey[50]
    },
    primary: {
      light: Colors.grey[300],
      main: Colors.grey[50],
      dark: Colors.grey[500],
      contrastText: '#000'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});

lightTheme = responsiveFontSizes(lightTheme);

function App() {
  //
  const [theme, setTheme] = useState(darkTheme);
  const [trucks, setTrucks] = useState([]);
  const [filterTrucks, setFilterTrucks] = useState([])
  const [browserLocation, setBrowserLocation] = useState([]);
  // set the distance to 10,000 km for now...
  const [distance, setDistance] = useState(10000);
  const [vendor, setVendor] = useState(null);
  const [foods, setFoods] = useState([]);

  const { loading, error, longitude, latitude } = useGeolocation();
  if (loading) console.log('loading location...');
  if (error) console.log('error getting location');

  // create references
  const rootRef = createRef();
  // const naviRef = createRef();
  // const contentRef = createRef();
  // const outletRef = createRef();

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
              truck.latitude &&
              truck.latitude !== '0' &&
              truck.longitude &&
              truck.longitude !== '0'
          );
        // console.log(data)
        setTrucks(data);
      });

    if (latitude && longitude) {
      setBrowserLocation([latitude, longitude]);
    }

    // if (theme === 'dark') {
    //  //
    // }
  }, [latitude, longitude]);


  console.log('spacing: ', lightTheme.spacing(2))
  return (
    <ThemeProvider theme={theme}>
      <Stack
        ref={rootRef}

      >
        <Stack
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Navigation
            // ref={naviRef}
            setTheme={setTheme}
            theme={theme}
            lightTheme={lightTheme}
            darkTheme={darkTheme}
          />
          <Stack
            // ref={contentRef}
            sx={{
              backgroundColor: 'primary.main',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              display: {
                xs: 'none',
                sm: 'flex',
                md: 'flex',
                lg: 'flex',
                xl: 'flex'
              },
              // TODO: I should grab a reference to the AppBar and properly store/memoize the dimensions, brute-forcing the padding is not the best solution

              top: (theme) => `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(5)})`,
              width: {
                xs: '80%',
                sm: '80%',
                md: '80%',
                lg: '80%',
                xl: '80%'
              }
            }}
            style={{
              position: 'absolute',
            }}
            direction='column'
          >
              <Stack
                direction='row'
                sx={{
                  display: 'flex',
                  flexGrowth: 1,
                  width: '100%',
                  // border: '1px solid',
                  padding: 5,
                  // height: '100%',
                }}
                // spacing={2}
              >
              <Outlet
                // ref={outletRef}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                context={{
                  trucks: trucks,
                  filterTrucks: filterTrucks,
                  location: browserLocation,
                  vendor: vendor,
                  distance: distance,
                  foods: foods
                }}
              />


              <Form
                trucks={trucks}
                setDistance={setDistance}
                distance={distance}
                setVendor={setVendor}
                vendor={vendor}
                setFoods={setFoods}
                foods={foods}
              />
              </Stack>

              <Data
                setFilterTrucks={setFilterTrucks}
                trucks={trucks}
                location={browserLocation}
                vendor={vendor}
                distance={distance}
                foods={foods}
              />

          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
