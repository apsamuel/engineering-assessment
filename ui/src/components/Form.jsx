import './Form.scss';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line no-unused-vars
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
Form.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTrucks: PropTypes.func,
  setDistance: PropTypes.func,
  setVendor: PropTypes.func,
  setFoods: PropTypes.func,
  vendor: PropTypes.string,
  distance: PropTypes.number,
  foods: PropTypes.arrayOf(PropTypes.string)
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
'label + &': {
    marginTop: theme.spacing(3),
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
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))
const StyledSlider = styled(Slider)(( { theme }) => ({
  color: theme.palette.secondary.main,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
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
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}))

// eslint-disable-next-line no-unused-vars
const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  // color: 'yellow',
  fontSize: {
    xs: 5,
    sm: 5,
    md: 5,
    lg: 5,
    xl: 15
  },
}))

// eslint-disable-next-line no-unused-vars
const StyledHelperText = styled(FormHelperText)(({ theme }) => ({
  // color: 'yellow',
  fontSize: {
    xs: 5,
    sm: 5,
    md: 5,
    lg: 5,
    xl: 15
  }
}))

export default function Form({
  trucks = [],
  // eslint-disable-next-line no-unused-vars
  setTrucks = () => {
    console.log('setTrucks not implemented');
  },
  // eslint-disable-next-line no-unused-vars
  vendor = null,
  setVendor = () => {
    console.log('setVendor not implemented');
  },
  // eslint-disable-next-line no-unused-vars
  distance = 10000,
  setDistance = () => {
    console.log('setDistance not implemented');
  },
  // eslint-disable-next-line no-unused-vars
  foods = null,
  setFoods = () => {
    console.log('setFoods not implemented');
  }
}) {
  // gather unique vendors
  const vendors = Array.from(new Set(trucks.map((truck) => truck.applicant)));
  // gather unique food categories
  const foodItems = Array.from(
    new Set(
      trucks
        .filter((truck) => truck.fooditems)
        .map((truck) =>
          truck.fooditems
            .split(new RegExp('[;:.]', 'g'))
            .map((item) => item.trim())
            .map((item) => item.toLowerCase())
        )
        .flat()
    )
  );

  return (
    <Stack
      sx={{
        display: {
          xs: 'flex',
          sm: 'flex',
          md: 'flex',
          lg: 'flex',
          xl: 'flex'
        },
        // width: '100%',
        height: '100%',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`
      }}
    >
      {/* distance controls */}
      <FormControl  variant='filled' sx={{
        flexGrow: 1,
        width: '33%'
      }}>
        {/* <InputLabel
          id='vendor-distance-slider-label'
        >
        </InputLabel> */}
        <StyledSlider
          label='Distance'
          // labelId='vendor-distance-slider-label'
          aria-label='vendor-distance-slider'
          defaultValue={5000}
          getAriaValueText={(value) => `${value} km`}
          // the step may be a little unrealistic for real-world applications, i'm in NYC, the data is reflective of trucks in San Francisco
          step={250}
          shiftStep={1000}
          valueLabelDisplay='auto'
          min={5000}
          max={10000}
          // from 5000 km to 10000 km
          color={'primary.main'}
          marks
          onChange={(_, value) => {
            setDistance(value);
          }}
        />
        <StyledHelperText
        >
          Truck Distance
        </StyledHelperText>
      </FormControl>
      {/*  vendor controls */}
      <FormControl
        variant='filled'
        sx={{
          flexGrow: 1,
          width: '33%',
        }}
      >
        <StyledInputLabel
          id='vendor-name-multiple-select-label'
        >
          <Typography></Typography>
        </StyledInputLabel>
        <Select
          labelId='vendor-name-multiple-select-label'
          id='vendor-name-multiple-select'
          value={vendor || 'All'}
          input={<StyledInputBase id='vendor' label='Vendor' />}
          label='Vendor'
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'bottom'
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
          onChange={(event) => {
            console.log('setting.vendor', { vendor: event.target.value});
            setVendor(event.target.value);
          }}
        >
          {['All',...vendors].map((vendor) => (
            <MenuItem key={vendor} value={vendor}>
              {vendor}
            </MenuItem>
          ))}
        </Select>
        <StyledHelperText
        >
          Truck Vendors
        </StyledHelperText>
      </FormControl>
      {/*  food category controls */}
      <FormControl
        variant={'filled'}
        sx={{
          flexGrow: 1,
          width: '33%',
        }}
      >
        <StyledInputLabel
          id='category-name-multiple-select-label'
          sx={{
            color: 'primary.contrastText'
          }}
        >
          <Typography></Typography>
        </StyledInputLabel>
        <Select
          variant='filled'
          labelId='category-name-multiple-select-label'
          label='Category'
          id='category-name-multiple-select'
          value={foods || 'All'}
          // value={[]}
          input={<StyledInputBase id='category' label='Category' />}
          placeholder='Select a Category'
          onChange={(event) => {
            console.log('setting food category:', event.target.value);
            setFoods(event.target.value);
          }}
        >
          {['All', ...foodItems,].map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <StyledHelperText
        >
          Food Categories
        </StyledHelperText>
      </FormControl>
    </Stack>
  );
}
