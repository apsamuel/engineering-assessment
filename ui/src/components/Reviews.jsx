import './Reviews.scss';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {AnimatedStyledTypography } from './components/ThemedComponents.jsx';

export default function Reviews() {
  return (
    <Stack
      id={'Reviews'}
      className={'ReviewsComponent'}
      sx={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`
        // height: '100%',
      }}
    >
      <Box>
        <AnimatedStyledTypography
          variant='h6'
          component='div'
          sx={{
            fontFamily: 'Roboto',
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '0.3em'
          }}
        >
          {' '}
          Truck Reviews. Coming Soon!{' '}
        </AnimatedStyledTypography>
      </Box>
    </Stack>
  );
}
