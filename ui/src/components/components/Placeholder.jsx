// import { useMediaQuery } from "@uidotdev/usehooks";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import PlaceholderSVG from '../../assets/images/placeholder.svg';


Placeholder.propTypes = {
  elAnchorId: PropTypes.string,
  useStack: PropTypes.bool,
  stackOrientation: PropTypes.string,
  mediaQuery: PropTypes.string,
  children: PropTypes.node
};

export default function Placeholder({
  // eslint-disable-next-line no-unused-vars
  elAnchorId = null,
  useStack = false,
  stackOrientation = 'row',
  mediaQuery = '(min-width: 600px)',
  children =  (
    <Typography
      variant="h4"
      align="center"
      sx={{
        color: 'white',
        display: 'block',
        minWidth: '100%',
        padding: 2
      }}
    >
      <img
        src={PlaceholderSVG}
        alt="placeholder"
        style={{ width: '100%', height: 'auto' }}
      />
    </Typography>
  )
}) {
  const theme = useTheme();
  const matches = useMediaQuery(mediaQuery);
  return (
    useStack ? () => (
      <Stack
      direction={stackOrientation}
      sx={{
        display: matches ? 'none' : 'flex',
        width: '100%',
        border: `1px solid ${theme.palette.primary.contrastText}`,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {children}
    </Stack>
    ) : (
      <Box
      sx={{
        display: matches ? 'none' : 'flex',
        maxWidth: '100%',
        border: `1px solid ${theme.palette.primary.contrastText}`,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {children}
    </Box>
    )

  );
}