import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Reviews() {
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
        }}> Truck Reviews. Coming Soon!  </Typography>
    </Box>
  );
}