// import './Reviews.scss';
import { useState, useEffect } from 'react';
import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AnimatedStyledTypography } from './components/ThemedComponents.jsx';
import PropTypes from 'prop-types';

About.propTypes = {
  interval: PropTypes.number
};
export default function About({ interval = 1000 * 5.0 }) {
  const aboutHeader = 'Hungrèe?';
  const aboutDescriptions = [
    /*
      use embedded React.createElements to better format the text
    */
    React.createElement(Stack, null,
      React.createElement('span', { style: {fontWeight: 'bold'}}, 'We put safety first ...'),
      React.createElement('span', null, 'You see only licensed vendors.')
    ),
    React.createElement(Stack, null,
      React.createElement('span', null, 'You tell us where your appetite is leading you ...'),
      React.createElement('span', { style: {fontWeight: 'bold'}}, 'We crunch the numbers & provide distance estimates.'),
    ),
    React.createElement(Stack, null,
      React.createElement('span', { style: {fontWeight: 'bold'}}, 'We visualize truck data dynamically ...'),
      React.createElement('span', null, 'You gain insights and make data driven decisions'),
    ),
    React.createElement(Stack, null,
      React.createElement('span', null, 'You share your experiences ...'),
      React.createElement('span', { style: {fontWeight: 'bold'}}, 'We provide a platform for reviews & collaboration'),

    ),
  ];
  const [description, setDescription] = useState(aboutDescriptions[0]);

  useEffect(() => {
    const reloadInterval = setInterval(() => {
      // switch the description every 10 seconds
      setDescription(
        aboutDescriptions[Math.floor(Math.random() * aboutDescriptions.length)]
      );
      console.log('description:', description);
    }, interval);
    return () => clearInterval(reloadInterval);
  });
  return (
    <Stack
      id={'About'}
      className={'AboutComponent'}
      spacing={5}
      direction={'column'}
      sx={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`
      }}
    >
        <Box
          sx={{
            // display: 'flex',
            // flexGrow: 1
          }}
        >
          <Typography
            variant={'h3'}
            component={'div'}
          >{aboutHeader}</Typography>
        </Box>
        <Box>
          <AnimatedStyledTypography

            variant='h6'
            component='div'
            // animate={{
            //   x: [0, 20, -20, 20, -20, 0]
            // }}
            transition={{
              duration: 1.5
            }}
            sx={{
              fontFamily: 'Roboto',
              color: (theme) => theme.palette.primary.contrastText,
              alignSelf: 'flex-end',
            }}
          >
            {' '}
            {description}{' '}
          </AnimatedStyledTypography>
        </Box>
    </Stack>
  );
}
