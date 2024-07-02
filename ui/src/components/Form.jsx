import './Form.scss';
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line no-unused-vars
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { motion } from 'framer-motion';
import {
  AnimatedStyledInputBase,
  StyledSlider,
  StyledInputLabel,
  StyledHelperText
} from './components/ThemedComponents.jsx';

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

  // eslint-disable-next-line no-unused-vars
  const history = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const appLocation = useLocation();

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
      id={'Form'}
      className={'FormComponent'}
      sx={{
        // padding: 0,
        display: {
          xs: 'flex',
          sm: 'flex',
          md: 'flex',
          lg: 'flex',
          xl: 'flex'
        },
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `2px solid ${theme.palette.primary.contrastText}`,

      }}
    >
      {/* <Placeholder/> */}
      {/* distance controls */}
      <FormControl  variant='filled' sx={{
        flexGrow: 0.5,
        minWidth: '33%'
      }}>
        <StyledSlider
          label='Distance'
          // labelId='vendor-distance-slider-label'
          aria-label='vendor-distance-slider'
          defaultValue={5000}
          getAriaValueText={(value) => `${value} km`}
          valueLabelDisplay='auto'
          /*
            NOTE: the step may be a little unrealistic for real-world applications,
            i'm in NYC, the data is reflective of trucks in San Francisco, to enable geolocation/distance calculations,
            I need to fake some data, these trucks are within 5000 km of NYC, so the slider is set to 5000 km as a base value
            since someone testing this may be in Alaska, I've set the max to 10000 km to provide some flexibility

            TODO: test REACT environment variables to set the max distance based on the user's location, as well as other defaults to make this more flexible for users and developers
          */
          step={250}
          shiftStep={1000}
          min={5000}
          max={10000}
          color={'primary.main'}
          marks
          onChange={(_, value) => {
            console.log('truck.distance', { value });
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
          flexGrow: 0.333,
          minWidth: '33%',
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
          input={<AnimatedStyledInputBase id='vendor' label='Vendor' />}
          label='Vendor'
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'bottom'
            },
            getAnchorEl: null,
            // transformOrigin: {
            //   vertical: "top",
            //   horizontal: "left"
            // }
          }}
          onChange={(event) => {
            console.log('truck.vendor', { value: event.target.value});
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
          flexGrow: 0.333,
          minWidth: '33%',
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
          input={<AnimatedStyledInputBase id='category' label='Category' />}
          placeholder='Select a Category'
          onChange={(event) => {
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
