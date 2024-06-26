import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

Navigation.propTypes = {
  lightTheme: PropTypes.object,
  darkTheme: PropTypes.object,
  setTheme: PropTypes.func
};

export default function Navigation({
  lightTheme = {},
  darkTheme = {},
  setTheme = () => {
    console.log('setTheme not implemented');
  }
}) {
  const pages = ['Trucks', 'Foo', 'Serving'];

  useEffect(() => {
    console.log('rendering Navigation...')
  })

  return (
    <AppBar position='absolute' sx={{ top: 0 }}>
      <Container
        maxWidth='xl'
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            component='div'
            sx={{
              mr: 1,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'Roboto, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: 'white',
              textDecoration: 'none'
            }}
          >
            Hungrèe
          </Typography>
          <Stack
            direction={'row'}
            sx={{ alignContent: 'center', justifyContent: 'center' }}
          >
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              {pages.map((page) => (
                <Button
                  variant='outlined'
                  key={page}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block'
                  }}
                >
                  {page}
                </Button>
              ))}
            </FormGroup>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box>
                <Switch
                  id='hungree-app-theme-switch'
                  aria-labelledby='hungree-app-theme-switch-label'
                  aria-label='hungree-app-theme-switch'
                  onChange={(event) => event.target.checked ? setTheme(darkTheme) : setTheme(lightTheme)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Box>
            </FormGroup>
          </Stack>
          <Box>
            <Icon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '1rem',
                mr: 1
              }}
            >
              <img
                style={{
                  display: 'flex',
                  border: '1px solid white',
                  width: '2rem',
                  height: '2rem',
                  color: 'white'
                }}
                src={'../../src/assets/truck.svg'}
              />
            </Icon>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
