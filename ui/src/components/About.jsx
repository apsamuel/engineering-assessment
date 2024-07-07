// import './Reviews.scss';
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// eslint-disable-next-line no-unused-vars
import Typography from '@mui/material/Typography';
import {
  // AnimatedStyled÷Typography,
  SmartTypography,
  // AnimatedBox,
  // AnimatedStack
} from './components/ThemedComponents.jsx';
import PropTypes from 'prop-types';
// import { delay, stagger } from 'framer-motion';

About.propTypes = {
  interval: PropTypes.number
};
export default function About({ interval = 1000 * 10.0 }) {
  const location = useLocation();
  const aboutHeader = 'About Hungrèe';

  const animationProps = {
    you: {
      staggerChildren: 0.33,
      delayChildren: 0.05,
      initial: {
        opacity: 0,
        y: '-10em',

      },

      animate: {
        opacity: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        y: '10em',

      },
      transition: {
        type: 'spring',
        damping: 5,
        stiffness: 70,
        duration: 15.5,
        // ease: [0.16, 1, 0.3, 1]
      }
    },
    we: {
      // staggerChildren: 0,
      // delayChildren: 0,
      initial: {
        // opacity: 0.333,
        opacity: 0,
        y: '10em',
        // x: '10em'
      },
      animate: {
        opacity: 1,
        y: '0em',
        // x: '0em'
      },
      exit: {
        opacity: 0,
        y: '-10em',
        // x: '-
      },
      transition: {
        type: 'spring',
        // repeat: 5,
        damping: 5,
        stiffness: 70,
        duration: 15.5,
        // ease: [0.16, 1, 0.3, 1],
        // when: 'beforeChildren'
      }
    }
  }
  const descriptions = useMemo(
    () => [
      {
        we: 'use licensed vendors with professional presentation ✅',
        you: 'enjoy the best & safest food options',
        iconOrImage: null
      },
      {
        we: 'facilitate search by vendor, category, or location 🤯',
        you: 'tell us where your appetite is leading you 🌎',
        iconOrImage: null
      },
      {
        we: 'generate dynamic visualizations 📉',
        you: 'gain insights 👁️ & let the data drive decisions 🧑🏻‍💻',
        iconOrImage: null
      },
      {
        we: 'provide a platform for user reviews ✔︎',
        you: 'share your best 😎, worse 🥹 and in the middle 😒 experiences',
        iconOrImage: null
      }
    ],
    []
  );
  const [description, setDescription] = useState({
    we: 'will get you fed',
    you: 'are hungrèe'
  });


  useEffect(() => {
    const reloadInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * descriptions.length);
      setDescription(
        descriptions[idx]
      );
      // console.log('description:', description);
    }, interval);
    return () => clearInterval(reloadInterval);
  }, [descriptions, description, interval]);
  return (
    <Stack
      key={location.pathname}
      id={'AboutHeader'}
      className={'AboutHeaderComponent'}
      direction={'column'}
      spacing={10}
      sx={{
        flexGrow: 1,
        padding: 5,
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) => theme.palette.secondary.main
        }}
      >
        <SmartTypography
          typographyProps={{
            fontFamily: 'Roboto',
            fontSize: '2.5rem',
            fontWeight: 700,
          }}
        >
          {aboutHeader}
        </SmartTypography>
      </Box>

      <Box

        sx={{
          // backgroundColor: (theme) => theme.palette.secondary.main,
          padding: '5',
        }}
      >


        <SmartTypography
          // layout
          animateCharacters={false}
          animateWords={true}
          animationProps={{
            ...animationProps.we
          }}
          typographyProps={{
            fontFamily: 'Roboto',
            fontSize: `1.3rem`,
            // color: (theme) => theme.palette.secondary.light,
            // alignSelf: 'flex-end'
          }}
          keywords={['We', 'You', 'truck', 'vendor', 'category', 'location']}
        >
          {`We ${description.we}`}
        </SmartTypography>
      </Box>

      <Box

        sx={{
          // backgroundColor: (theme) => theme.palette.secondary.main
        }}
      >
        <SmartTypography
          animateCharacters={false}
          animateWords={true}
          animationProps={{
            ...animationProps.you
          }}
          typographyProps={{
            fontFamily: 'Roboto',
            fontSize: `1rem`,
            // color: (theme) => theme.palette.primary.contrastText
          }}
          keywords={['We', 'You', 'truck', ]}
        >
          {`You ${description.you}`}
        </SmartTypography>
      </Box>



    </Stack>
  );
}
