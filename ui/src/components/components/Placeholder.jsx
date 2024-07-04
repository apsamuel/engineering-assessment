import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Logo from '../../assets/images/resize.svg?react';
import { motion } from 'framer-motion';

Placeholder.propTypes = {
  elAnchorId: PropTypes.string,
  useStack: PropTypes.bool,
  stackOrientation: PropTypes.string,
  stackProperties: PropTypes.object,
  mediaQuery: PropTypes.bool,
  children: PropTypes.node
};

export default function Placeholder({
  // eslint-disable-next-line no-unused-vars
  elAnchorId = null,
  // useStack = false,
  stackOrientation = 'column',
  stackProperties = {},
  // the placeholder is shown in place of the adjacent component
  mediaQuery = false,
  // children = (
  //   <>
  //     <Box>
  //       <Typography
  //         sx={{
  //           color: (theme) => theme.palette.primary.contrastText
  //         }}
  //       >
  //         🤲🏻 We need a little more space for a feature rich journey!
  //       </Typography>
  //     </Box>
  //     <Box
  //       // variant="h4"
  //       align='center'
  //       sx={{
  //         alignContent: 'center',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         display: 'flex',
  //         flexGrow: 1
  //       }}
  //     >
  //       <Logo alt='logo' />
  //     </Box>
  //   </>
  // )
}) {

  const currentHeight = useMemo(() => window.innerHeight, []);
  const currentWidth = useMemo(() => window.innerWidth, []);
  const [windowHeight, setWindowHeight] = useState(currentHeight);
  const [windowWidth, setWindowWidth] = useState(currentHeight);
  const theme = useTheme();
  useEffect(() => {
    // window height and width

    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    if (elAnchorId) {
      const el = document.getElementById(elAnchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elAnchorId, currentHeight, currentWidth, window.innerHeight, window.innerWidth]);
  const fluidSxProperties = {
    display: mediaQuery ? 'flex' : 'none',
    alignContent: 'center',
    flexGrow: 1,
    maxWidth: '100%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    border: (theme) => `2px solid ${theme.palette.primary.contrastText}`
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 10 }}
    >
      <Stack
        id={'Placeholder'}
        className={'PlaceholderComponent'}
        direction={stackOrientation}
        sx={{
          ...fluidSxProperties,
          ...stackProperties,
          padding: 2
        }}
        spacing={2}
      >
        {/* {children} */}
        <>
          <Box
            sx={{
              // minWidth: '10%',
              // minHeight: '10%',
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.contrastText
              }}
            >
              🤲🏻 We need a little more space for a feature rich journey!
              {windowWidth}x{windowHeight}
            </Typography>
          </Box>
          <Box
            // variant="h4"
            align='center'
            sx={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexGrow: 1,
              padding: 2,
              // borderTop: (theme) => `5px solid ${theme.palette.primary.contrastText}`,
              // borderBottom: (theme) => `10px solid ${theme.palette.primary.contrastText}`
            }}
          >
            <Logo alt='logo' />
          </Box>
        </>
      </Stack>
    </motion.div>
  );
}
