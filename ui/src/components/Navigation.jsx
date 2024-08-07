import './Navigation.scss';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { createRef, useLayoutEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
// configuration data
import { navigationLinks } from './config/SiteConfiguration.js';
// import { CatchingPokemonSharp } from '@mui/icons-material';

Navigation.propTypes = {
  lightTheme: PropTypes.object,
  darkTheme: PropTypes.object,
  setTheme: PropTypes.func,
  history: PropTypes.func
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
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
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
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
  }
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.contrastText
}));

export default function Navigation({
  lightTheme = {},
  darkTheme = {},
  setTheme = () => {
    console.log('setTheme not implemented');
  },
  // eslint-disable-next-line no-unused-vars
  history = () => {
    console.log('history not implemented');
  }
}) {
  const ref = createRef();

  useLayoutEffect(() => {
    const {
      // eslint-disable-next-line no-unused-vars
      clientHeight,
      // eslint-disable-next-line no-unused-vars
      clientWidth,
      // eslint-disable-next-line no-unused-vars
      offsetHeight,
      // eslint-disable-next-line no-unused-vars
      offsetWidth } =
      ref.current;

  });


  return (
    <AppBar
      ref={ref}
      id={'AppBar'}
      className={'AppBarComponent'}
      position='absolute'
      sx={{ top: 0 }}

    >
      <Container

        id={'NavigationController'}
        maxWidth='xl'
        sx={{
          // flexGrow: 1,
        }}
      >
        <Toolbar

          disableGutters
        >
          <Stack

            direction={'row'}
            sx={{
              flexGrow: 1,
              alignContent: 'space-around',
              justifyContent: 'baseline',

            }}
          >
            <Box
              style={{
              }}
              sx={{
                textDecoration: 'none'
              }}
            >
              <StyledNavLink to='/'>
                <Tooltip
                  title='Home'
                  placement='top'
                  arrow
                >
                <Typography
                  variant='h6'
                  component='div'
                  sx={{
                    mr: 1,
                    fontFamily: 'Roboto',
                    // fontSize: '2rem',
                    fontWeight: 700,
                    letterSpacing: '0.3em',
                    textDecoration: 'none'
                  }}
                >
                  Hungrèe
                </Typography>
                </Tooltip>

              </StyledNavLink>
            </Box>

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
                  alignItems: 'center'
                }}
              >
                <img
                  style={{
                    display: 'flex',
                    width: '2rem',
                    height: '2rem'
                  }}
                  src={'../../src/assets/images/truck.svg'}
                />
              </Icon>
            </Box>
          </Stack>

          <Stack
            direction={'row'}
            spacing={4}
            sx={{ alignContent: 'center', justifyContent: 'center' }}
          >
            {/* page links */}
            <Stack  direction={'row'} spacing={5}>
              {navigationLinks.map((page) => (
                  <StyledNavLink
                    key={page.name}
                    to={page.to}
                    sx={{
                      color: 'primary.contrastText'
                    }}
                    // eslint-disable-next-line no-unused-vars
                    style={({ isActive, isPending, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? 'bold' : 'normal',
                        viewTransitionName: isTransitioning ? 'fade' : 'none'
                      };
                    }}
                  >
                    <Tooltip
                      title={page.description}
                      placement='top'
                      arrow
                    >
                    <Stack direction={'row'} spacing={1}>
                    <Box>{page.icon}</Box>
                    <Box>
                    <Typography
                      key={`typography-${page.name}`}
                    >{page.name}</Typography>
                    </Box>
                    </Stack>
                    </Tooltip>




                  </StyledNavLink>
                // </Stack>
              ))}
            </Stack>

            {/* toggle theme controls */}
            <FormGroup
              sx={{ alignContent: 'center', justifyContent: 'center' }}
            >
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
