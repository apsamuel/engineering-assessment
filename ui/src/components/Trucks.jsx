import SanFrancLogo from '../assets/sanfran.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export default function Trucks() {
  return (
    <Box>
      <Typography
        variant='h6'
        component='div'
        sx={{
          fontFamily: 'Roboto',
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '0.3em'
        }}> Vendor Location Mapping. Coming Soon!  </Typography>
      <img src={SanFrancLogo} alt='San Francisco' />
    </Box>
  );
}