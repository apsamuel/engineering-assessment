// import './Reviews.scss';
import { useState, useEffect } from 'react';
import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AnimatedStyledTypography, SmartTypography } from './components/ThemedComponents.jsx';
import PropTypes from 'prop-types';

About.propTypes = {
  interval: PropTypes.number
};
export default function About({ interval = 1000 * 10.0 }) {
  const aboutHeader = 'Are You Hungrèe?';

  const descriptions = [
    {
      we: 'put your safety first',
      you: 'use licensed & approved vendors.'
    },
    {
      we: 'crunch the numbers for you',
      you: 'tell us where your appetite is leading you'
    },
    {
      we: 'provide dynamic visualizations',
      you: 'gain insights and make data driven decisions'
    },
    {
      we: 'provide a platform for reviews & collaboration',
      you: 'share your experiences'
    }
  ]
  // const aboutDescriptions = [
  //   /*
  //     use embedded React.createElements to better format the text
  //   */
  //   React.createElement(Stack, null,
  //     React.createElement(Box, null,
  //       React.createElement(
  //         'span',
  //         { style: {fontWeight: 'bold'}},
  //         'We put your safety first'
  //       ),
  //     ),
  //     React.createElement(Box, null,
  //       React.createElement('span', null, 'You use licensed & approved vendors.')
  //     )
  //   ),
  //   React.createElement(Stack, null,
  //     React.createElement(Box, null,
  //       React.createElement(
  //         'span',
  //         { style: {fontWeight: 'bold'}},
  //         'We crunch the numbers for you'),
  //     ),
  //     React.createElement(Box, null,
  //       React.createElement(
  //         'span',
  //         null,
  //         'You will tell us where your appetite is leading you')
  //     ),
  //   ),
  //   React.createElement(Stack, null,
  //     React.createElement(Box, null,
  //       React.createElement(
  //         'span',
  //         { style: {fontWeight: 'bold'}},
  //         'We provide dynamic visualizations'),
  //     ),
  //     React.createElement(Box, null,
  //       React.createElement(
  //         'span',
  //         null,
  //         'You gain insights and make data driven decisions'),
  //     )
  //   ),
  //   React.createElement(Stack, null,
  //     React.createElement(Box, null,
  //       React.createElement(
  //         'span',
  //         { style: {fontWeight: 'bold'}},
  //         'We provide a platform for reviews & collaboration'),
  //     ),
  //     React.createElement(Box, null,
  //       React.createElement(
  //         'span',
  //         null,
  //         'You share your experiences'),
  //     ),
  //   ),
  // ];
  const [description, setDescription] = useState(descriptions[0]);

  useEffect(() => {
    const reloadInterval = setInterval(() => {
      // switch the description every 10 seconds
      setDescription(
        descriptions[Math.floor(Math.random() * descriptions.length)]
      );
      // console.log('description:', description);
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
        overflow: 'hidden',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`
      }}
    >
        <Box
          sx={{
          }}
        >
          <SmartTypography
            variant={'h1'}
            component={'div'}
          >{aboutHeader}</SmartTypography>
        </Box>
        <Box>
          <AnimatedStyledTypography
            layout
            variant='h6'
            component='div'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 10.5
            }}
            sx={{
              fontFamily: 'Roboto',
              color: (theme) => theme.palette.primary.contrastText,
              alignSelf: 'flex-end',
            }}
          >
            {' '}
            {`We ${description.we}`}{' '}
          </AnimatedStyledTypography>
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
            {`You ${description.you}`}{' '}
          </AnimatedStyledTypography>
        </Box>
    </Stack>
  );
}
