// import { useMediaQuery } from "@uidotdev/usehooks";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';


Placeholder.propTypes = {
  mediaQuery: PropTypes.string,
  children: PropTypes.node
};

export default function Placeholder({
  mediaQuery = '(min-width: 600px)',
  children =  (
    <Typography
      variant="h4"
      align="center"
      sx={{
        color: 'white',
        display: 'block',
        width: '100%',
        padding: 2
      }}
    >
      Placeholder
    </Typography>
  )
}) {
  const theme = useTheme();
  // console.log(theme)
  const matches = useMediaQuery(mediaQuery);
  return (
    <Box
      sx={{
        display: matches ? 'none' : 'flex',
        width: '100%',
        border: '1px solid red',
      }}
    >
      {children}
    </Box>
  );
}