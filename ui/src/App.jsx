import './App.scss';
import { useState, useEffect, createRef } from 'react';
import { useGeolocation, useWindowSize } from '@uidotdev/usehooks';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useHistory, useLocation } from 'react-router-dom';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Data from './components/Data';
import Form from './components/Form';
import { motion } from 'framer-motion';
// import { gridRowMaximumTreeDepthSelector } from '@mui/x-data-grid';

const darkTheme = responsiveFontSizes(
  createTheme({
    components: {
      DataGrid: {
        styleOverrides: {
          root: {
            // backgroundColor: '#F00909'
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            // backgroundColor: '#A92323'
          }

        }
      }
    },
    menu: {
      '& .MuiPaper-root': {
        // backgroundColor: '#000000'
        // backgroundColor: '#D31919'
      }

    },
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
  })
);

const lightTheme = responsiveFontSizes(
  createTheme({
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
  })
);

// const AnimatedForm = motion(Form);
const AnimatedStack = motion(Stack);

function App() {
  // test env var availability
  console.log(import.meta.env)
  const history = useNavigate();
  const appLocation = useLocation();

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { loading, error, longitude, latitude } = useGeolocation();
  const [theme, setTheme] = useState(darkTheme);
  const [trucks, setTrucks] = useState([]);
  const [filterTrucks, setFilterTrucks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [windowSize, setWindowSize] = useState([0, 0]);
  const [browserLocation, setBrowserLocation] = useState([]);
  // we're in NYC, and we want to see all the trucks...
  const [distance, setDistance] = useState(10000);
  const [vendor, setVendor] = useState('All');
  const [foods, setFoods] = useState('All');

  if (loading) {
    console.log('user.location', { loading });
  }
  if (error) {
    console.log('user.location', { error });
  }


  const rootRef = createRef();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_HOST}/api/trucks`)
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
      setWindowSize([windowWidth, windowHeight]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // windowHeight,
    // windowWidth,
    // windowSize,
    latitude,
    longitude,
    theme
  ]);

  return (
    <ThemeProvider theme={theme} id='ThemeProvider'>
      {/*
        contains the application's root element
      */}
      <Stack
        ref={rootRef}
        id='AppContainer'
        className='AppContainer'
        sx={{
          display: 'flex',
          minWidth: '100%',
          minHeight: '100%',
          // transition: (theme) =>
          //   theme.transitions.create(['width', 'height'], {
          //     easing: theme.transitions.easing.easeIn,
          //     duration: theme.transitions.duration.enteringScreen
          //   })
        }}
      >
        {/*
          controls high-level characteristics of the application
         */}
        <Stack
          useFlexGap
          id='AppController'
          spacing={5}
          sx={{
            display: 'flex',
            flexGrowth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            top: (theme) =>
              `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(5)})`,

          }}
        >
          {/*
            navigation controls are rendered here!
          */}
          <Navigation
            setTheme={setTheme}
            theme={theme}
            lightTheme={lightTheme}
            darkTheme={darkTheme}
            history={history}
          />
          {/*
            app content is rendered here!
          */}
          <AnimatedStack
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 0.5
            }}
            id='AppContentContainer'
            sx={{
              /*
                contentStart = navigationHeight(px) + themePadding(px)*2
              */
              position: 'relative',
              backgroundColor: 'primary.main',
              borderRadius: (theme) => theme.shape.borderRadius,
              border: (theme) =>
                `1px solid ${theme.palette.primary.contrastText}`,
              top: (theme) =>
                `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(
                  2
                )})`,
              padding: (theme) => theme.spacing(2),
              display: {
                xs: 'flex',
                sm: 'flex',
                md: 'flex',
                lg: 'flex',
                xl: 'flex'
              },
              flexGrowth: 1,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '90%'
            }}
            direction='column'
            spacing={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5
            }}
          >
            {/*
              main content container
            */}
            <Stack
              id='ReactiveContentContainer'
              direction='row'
              spacing={10}
              sx={{
                display: 'flex',
                flexGrow: 1,
                width: '100%',
                // minHeight: '50%'
              }}
            >
              {/* controls high-level characteristics of routed child components */}
              <Box
                id='OutletController'
                sx={{
                  flexGrow: 1,
                  display: appLocation.pathname === '/' ? 'none' : 'flex',
                  minWidth: '50%',
                  maxWith: '100%'
                }}
              >

                <Outlet
                  style={{
                    flexGrow: 1,
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

              {/* controls form size and high level characteristics */}
              <Box
                id='FormController'
                sx={{
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexGrow: appLocation.pathname === '/' ? 1 : 0.666,
                  minWidth: appLocation.pathname === '/' ? '80%' : '40%'
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
              id='DataGrid'
              setFilterTrucks={setFilterTrucks}
              trucks={trucks}
              location={browserLocation}
              vendor={vendor}
              distance={distance}
              foods={foods}
            />
          </AnimatedStack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
