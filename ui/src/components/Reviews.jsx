import './Reviews.scss'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Reviews() {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) =>
          `1px solid ${theme.palette.primary.contrastText}`,
        // height: '100%',
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
          }}> Truck Reviews. Coming Soon!  </Typography>
      </Box>
    </Stack>

  );
}