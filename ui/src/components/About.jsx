// import './Reviews.scss';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function About() {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`

      }}
    >
      <Box>
        <Typography
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
          About Hungrèe. Coming Soon!{' '}
        </Typography>
      </Box>
    </Stack>
  );
}
