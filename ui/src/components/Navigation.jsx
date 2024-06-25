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
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

export default function Navigation() {
  const pages = ['Trucks', 'Foo', 'Serving'];

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
          <Stack direction={'row'}>
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
