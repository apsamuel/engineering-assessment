import './ThemedComponents.scss';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { NavLink } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import {
  DataGrid
  // GridToolbar,
  // useGridApiRef
  // gridClasses
} from '@mui/x-data-grid';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';



const StyledTypography = styled(Typography)(( { theme}) => ({
  display: 'flex',
  color: theme.palette.primary.contrastText
}));

const AnimatedStyledTypography = motion(StyledTypography);


const StyledThemeToggleSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
  }
}))

const AnimatedStyledThemeToggleSwitch = motion(StyledThemeToggleSwitch);

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.contrastText
}));

const AnimatedStyledNavLink = motion(StyledNavLink);

// eslint-disable-next-line no-unused-vars
const StyledReactECharts = styled(ReactECharts)(({ theme }) => ({
  height: 250
}));

const AnimatedStyledReactECharts = motion(StyledReactECharts);


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  display: {
    sm: 'none',
    md: 'none',
    lg: 'flex'
  },
  border: 0,
  color: theme.palette.primary.contrastText,
  fontFamily: ['Roboto'].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontFamily: ['Roboto'].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal'
  }
}));

const AnimatedStyledDataGrid = motion(StyledDataGrid);

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}));

const AnimatedStyledInputBase = motion(StyledInputBase);

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.secondary.main,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&::before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
}));

const AnimatedStyledSlider = motion(StyledSlider);

// eslint-disable-next-line no-unused-vars
const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: {
    xs: 5,
    sm: 5,
    md: 5,
    lg: 5,
    xl: 15
  },
}))

const AnimatedStyledInputLabel = motion(StyledInputLabel);

// eslint-disable-next-line no-unused-vars
const StyledHelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: {
    xs: 5,
    sm: 5,
    md: 5,
    lg: 5,
    xl: 15
  }
}))

const AnimatedStyledHelperText = motion(StyledHelperText);

export {
  StyledThemeToggleSwitch,
  AnimatedStyledThemeToggleSwitch,
  StyledNavLink,
  AnimatedStyledNavLink,
  StyledReactECharts,
  AnimatedStyledReactECharts,
  StyledDataGrid,
  AnimatedStyledDataGrid,
  StyledInputBase,
  AnimatedStyledInputBase,
  StyledInputLabel,
  AnimatedStyledInputLabel,
  StyledHelperText,
  AnimatedStyledHelperText,
  StyledSlider,
  AnimatedStyledSlider,
  StyledTypography,
  AnimatedStyledTypography
};
