import './App.scss';
import { useState, useEffect, createRef } from 'react';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
import { useGeolocation, useWindowSize } from '@uidotdev/usehooks';
import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navigation from './components/Navigation';
import Data from './components/Data';
import Form from './components/Form';
import { Outlet } from 'react-router-dom';


let darkTheme = createTheme({
  mixins: {
    MuiDataGrid: {}
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#000000'
    },
    primary: {
      light: '#9E9DB6',
      main: '#2B2A2A',
      dark: '#101010',
      contrastText: '#8E8181'
    },
    secondary: {
      light: '#737C97',
      main: '#615F8C',
      dark: '#2B2768',
      contrastText: '#696161'
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
      light: '#61B5FF',
      main: '#57A1E1',
      dark: '#2C5172',
      contrastText: '#000'
    }
  }
});

lightTheme = responsiveFontSizes(lightTheme);

function App() {
  //
  const [theme, setTheme] = useState(darkTheme);
  const [trucks, setTrucks] = useState([]);
  const [filterTrucks, setFilterTrucks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [windowSize, setWindowSize] = useState([0, 0]);
  const [browserLocation, setBrowserLocation] = useState([]);
  // set the distance to 10,000 km for now...
  const [distance, setDistance] = useState(10000);
  const [vendor, setVendor] = useState(null);
  const [foods, setFoods] = useState([]);

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { loading, error, longitude, latitude } = useGeolocation();
  if (loading) console.log('load.location', { loading });
  if (error) console.log('location.error', { error });

  // create references
  const rootRef = createRef();

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
        setTrucks(data);
      });

    if (latitude && longitude) {
      setBrowserLocation([latitude, longitude]);
    }

    if (windowWidth && windowHeight) {
      console.log('window.dimensions', windowSize);
      setWindowSize([windowWidth, windowHeight]);
    }
  }, [latitude, longitude, theme]);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        ref={rootRef}
        className='App'
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Navigation
            setTheme={setTheme}
            theme={theme}
            lightTheme={lightTheme}
            darkTheme={darkTheme}
          />
          {/* application content is rendered in this component */}
          <Stack
            sx={{
              /* contentStart = navigationHeight(px) + themePadding(px) */
              top: (theme) =>
                `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(
                  5
                )})`,
              display: {
                xs: 'none',
                sm: 'flex',
                md: 'flex',
                lg: 'flex',
                xl: 'flex'
              },
              // paddingLeft: (theme) => theme.spacing(5),
              // paddingRight: (theme) => theme.spacing(5),
              // paddingBottom: (theme) => theme.spacing(5),
              flexGrowth: 1,
              backgroundColor: 'primary.main',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
            style={{
              position: 'absolute'
            }}
            direction='column'
            spacing={5}
          >
            {/* contains a form, and an outlet which renders routed child components */}
            <Stack
              direction='row'
              sx={{
                display: 'flex',
                flexGrow: 1,
                width: '100%',
                alignContent: 'space-between',
                // border: (theme) => `1px solid ${theme.palette.primary.contrastText}`,

                padding: (theme) => theme.spacing(2)
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  minWidth: '50%',

                }}
              >
                <Outlet
                  style={{
                    display: 'flex',
                    flexGrowth: 1,
                    justifyContent: 'center'
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
              </Box>

              <Box
                sx={{
                  minWidth: '25%',
                }}
              >
                <Form
                  trucks={trucks}
                  setDistance={setDistance}
                  distance={distance}
                  setVendor={setVendor}
                  vendor={vendor}
                  setFoods={setFoods}
                  foods={foods}
                />
              </Box>
            </Stack>
            {/* DataGrid can preserve it's own reactivity when given the proper paramters */}
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
