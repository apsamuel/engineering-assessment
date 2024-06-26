import { useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
  setTrucks = () => {
    console.log('setTrucks not implemented');
  },
  vendor = null,
  setVendor = () => {
    console.log('setVendor not implemented');
  },
  distance = 10000,
  setDistance = () => {
    console.log('setDistance not implemented');
  },
  foods = null,
  setFoods = () => {
    console.log('setFoods not implemented');
  }
}) {
  // unique vendors
  const vendors = Array.from(new Set(trucks.map((truck) => truck.applicant)));
  // unique food categories
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

  useEffect(() => {

  });
  return (
    <Stack
      direction={'row'}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        m: 1
      }}
      spacing={4}
    >
      {/* distance controls */}
      <FormControl>
        <Box sx={{ width: 200 }}>
          <InputLabel id='vendor-distance-slider-label'>
            <Typography variant='caption'>Distance</Typography>
          </InputLabel>
          <Slider
            labelId='vendor-distance-slider-label'
            aria-label='vendor-distance-slider'
            defaultValue={5000}
            getAriaValueText={(value) => `${value} km`}
            // the step may be a little unrealistic for real-world applications, i'm in NYC, the data is reflective of trucks in San Francisco
            step={1000}
            valueLabelDisplay='on'
            min={5000}
            max={10000}
            // from 5000 km to 10000 km
            color={'primary'}
            marks={[
              { value: 5000, label: '5000 km' },
              { value: 10000, label: '10000 km' }
            ]}
            onChange={(_, value) => {
              console.log('value:', value);
              setDistance(value);
            }}
          />
        </Box>
      </FormControl>
      {/*  vendor controls */}
      <FormControl
        sx={{
          m: 1
        }}
      >
        <InputLabel id='vendor-name-multiple-select-label'>
          <Typography>Vendor</Typography>
        </InputLabel>
        <Select
          labelId='vendor-name-multiple-select-label'
          id='vendor-name-multiple-select'
          // multiple
          value={[vendors[0]]}
          input={<OutlinedInput id='vendor' />}
          label='Vendor'
          onChange={(event) => {
            console.log('setting vendor:', event.target.value);
            setVendor(event.target.value);
          }}
        >
          {vendors.map((vendor) => (
            <MenuItem key={vendor} value={vendor}>
              {vendor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*  food category controls */}
      <FormControl
        sx={{
          flexDirection: 'row',
          m: 1
        }}
      >
        <InputLabel id='category-name-multiple-select-label'>
          <Typography>Categories</Typography>
        </InputLabel>
        <Select
          labelId='category-name-multiple-select-label'
          id='category-name-multiple-select'
          // multiple
          value={[foodItems[0]]}
          input={<OutlinedInput id='category' />}
          label='Categories'
          onChange={(event) => {
            console.log('setting food category:', event.target.value);
            setFoods(event.target.value);
          }}
        >
          {foodItems.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
