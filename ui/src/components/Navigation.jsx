import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
// import NavLink from './components/NavLink.jsx'
// import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

Navigation.propTypes = {
  lightTheme: PropTypes.object,
  darkTheme: PropTypes.object,
  setTheme: PropTypes.func
};

const ToggleThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}))

export default function Navigation({
  lightTheme = {},
  darkTheme = {},
  setTheme = () => {
    console.log('setTheme not implemented');
  }
}) {
  const pages = ['Trucks', 'Visualize', 'Reviews'];
  const pagesX = [
    {
      name: 'Trucks',
      to: '/trucks',
      position: 1
    },
    {
      name: 'Visualize',
      to: '/viz',
      position: 2
    },
    {
      name: 'Reviews',
      to: '/reviews',
      position: 3
    }
  ]

  useEffect(() => {
  });

  return (
    <AppBar position='absolute' sx={{ top: 0 }}>
      <Container
        maxWidth='xl'
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Toolbar disableGutters>
          <Stack
            direction={'row'}
            sx={{
              flexGrow: 1,
              alignContent: 'center',
              justifyContent: 'baseline',
            }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{
                mr: 1,
                fontFamily: 'Roboto',
                fontSize: '2rem',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textDecoration: 'none'
              }}
            >
              Hungrèe
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1rem',
                mr: 1
              }}
            >
              <Icon
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  style={{
                    display: 'flex',
                    width: '2rem',
                    height: '2rem',
                  }}
                  src={'../../src/assets/truck.svg'}
                />
              </Icon>
            </Box>
          </Stack>

          <Stack
            direction={'row'}
            spacing={4}
            sx={{ alignContent: 'center', justifyContent: 'center', }}
          >

            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              {pagesX.map((page) => (
                <Button
                  variant='outlined'
                  key={page.name}
                  sx={{
                    color: 'primary.contrastText',
                  }}
                  onClick={() => {
                    console.log('link: ', page.name, 'to: ', page.to);
                  }}
                  // component={NavLink}
                >
                  {page.name}
                </Button>
              ))}
            </FormGroup>
            <FormGroup sx={{  alignContent: 'center', justifyContent: 'center'}}>
              <Box>
                <ToggleThemeSwitch
                  id='hungree-app-theme-switch'
                  aria-labelledby='hungree-app-theme-switch-label'
                  aria-label='hungree-app-theme-switch'
                  onChange={(event) =>
                    event.target.checked
                      ? setTheme(darkTheme)
                      : setTheme(lightTheme)
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Box>
            </FormGroup>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
