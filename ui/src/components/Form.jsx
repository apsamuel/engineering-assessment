import './Form.scss';
import { createRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line no-unused-vars
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { useMediaQuery } from '@mui/material';
import {
  StyledSlider,
  StyledInputLabel,
  StyledHelperText
} from './components/ThemedComponents.jsx';

Form.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTrucks: PropTypes.func,
  setDistance: PropTypes.func,
  setVendor: PropTypes.func,
  setFoodCategories: PropTypes.func,
  vendor: PropTypes.string,
  distance: PropTypes.number,
  foodCategories: PropTypes.arrayOf(PropTypes.string)
};

export default function Form({
  trucks = [],
  // eslint-disable-next-line no-unused-vars
  setTrucks = () => {
    console.log('set.trucks', {
      error: 'setTrucks not implemented'
    });
  },
  // eslint-disable-next-line no-unused-vars
  vendor = null,
  setVendor = () => {
    console.log('set.vendor', {
      error: 'setVendor not implemented'
    });
  },
  // eslint-disable-next-line no-unused-vars
  distance = 10000,
  setDistance = () => {
    console.log('set.distance', {
      error: 'setDistance not implemented'
    })
    // console.log('setDistance not implemented');
  },
  // eslint-disable-next-line no-unused-vars
  foodCategories = null,
  setFoodCategories = () => {
    console.log('setFoodCategories not implemented');
  }
}) {
  const vendorInputRef = createRef();
  const distanceInputRef = createRef();
  const foodInputRef = createRef();
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

  // const mediaQuery = !useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Stack
      id={'Form'}
      className={'FormComponent'}
      sx={{
        // alignItems: appLocation.pathname === '/' ? 'space-between' : 'flex-end',
        flexGrow: appLocation.pathname === '/' ? 1 : 0.5,
      }}
    >

      <Stack
        id={'Form'}
        className={'FormComponent'}
        spacing={2}
        sx={{
          // float left

          padding: 2,
          display: 'flex',
          flexGrow: 1,
          // maxWidth: '50%',
          ...(appLocation.pathname === '/' ? { width: '50%' } : { width: '33%' }),
          minWidth: appLocation.pathname === '/' ? '80%' : '90%',
          borderRadius: (theme) => theme.shape.borderRadius,
          border: (theme) => `2px solid ${theme.palette.primary.contrastText}`
        }}
      >
        {/* <Placeholder/> */}
        {/* distance controls */}
        <Stack
          // variant='filled'
          sx={{
            flexGrow: 0.5,
            minWidth: '33%'
          }}
        >
          <StyledSlider
            ref={distanceInputRef}
            label='Distance'
            // labelId='vendor-distance-slider-label'
            aria-label='vendor-distance-slider'
            defaultValue={distance}
            getAriaValueText={(value) => `${value} km`}
            valueLabelDisplay='always'
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
            // color={'primary.main'}
            marks
            onChange={(_, value) => {
              console.log('truck.distance', { value });
              setDistance(value);
            }}
          />
          <StyledHelperText>Distance</StyledHelperText>
        </Stack>
        {/*  vendor controls */}
        <FormControl
          // variant='filled'
          sx={{
            flexGrow: 0.333,
            minWidth: '33%'
          }}
        >
          <StyledInputLabel id='vendor-name-multiple-select-label'>
            <Typography>Vendor</Typography>
          </StyledInputLabel>
          <Select
            ref={vendorInputRef}
            autoWidth
            size={'small'}
            labelId='vendor-name-multiple-select-label'
            id='vendor-name-multiple-select'
            value={vendor || 'All'}
            label='Vendor'
            // open=
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'bottom'
              },
              getAnchorEl: () => {
                console.log(vendorInputRef.current);
                return vendorInputRef.current;
              }
            }}
            onChange={(event) => {
              console.log('truck.vendor', { value: event.target.value });
              setVendor(event.target.value);
            }}
          >
            {['All', ...vendors].map((vendor) => (
              <MenuItem key={vendor} value={vendor}>
                {vendor}
              </MenuItem>
            ))}
          </Select>
          {/* <StyledHelperText>Vendors</StyledHelperText> */}
        </FormControl>
        {/*  food category controls */}
        <FormControl
          // variant={'filled'}
          sx={{
            flexGrow: 0.333,
            minWidth: '33%'
          }}
        >
          <StyledInputLabel
            id='category-name-multiple-select-label'
            sx={{
              color: 'primary.contrastText'
            }}
          >
            <Typography>Category</Typography>
          </StyledInputLabel>
          <Select
            ref={foodInputRef}
            autoWidth
            size='small'
            labelId='category-name-multiple-select-label'
            label='Category'
            id='category-name-multiple-select'
            value={foodCategories || 'All'}
            // placeholder='Food Category'
            onChange={(event) => {
              setFoodCategories(event.target.value);
            }}
          >
            {['All', ...foodItems].filter(Boolean).map((category) => (
              <MenuItem
                // primaryText={category}
                dense
                key={category}
                value={category}
              >
                <Typography
                  sx={{
                    fontFamily: 'Roboto'
                  }}
                >
                  {category}
                </Typography>
              </MenuItem>
            ))}
          </Select>
          {/* <StyledHelperText>Categories</StyledHelperText> */}
        </FormControl>
      </Stack>
    </Stack>
  );
}
