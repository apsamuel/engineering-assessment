// import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

Form.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default function Form({ trucks = [] }) {
  const vendors = Array.from(new Set(trucks.map((truck) => truck.applicant)));
  const foodItems = Array.from(
    new Set(
      trucks
        .filter((truck) => truck.fooditems)
        .map(
          (truck) =>
            truck.fooditems
              .split(new RegExp('[;:.]', 'g'))
              .map((item) => item.trim())
              .map((item) => item.toLowerCase())
          // maybe limit the length of these strings...
        )
        .flat()
    )
  );
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
      <FormControl>

        <Box sx={{ width: 400 }}>
          <InputLabel id='vendor-distance-slider-label'>Distance</InputLabel>
          <Slider
            labelId='vendor-distance-slider-label'
            aria-label='vendor-distance-slider'
            defaultValue={0}
            getAriaValueText={(value) => `${value} km`}
            step={100}
            valueLabelDisplay='on'
            marks={[
              { value: 100, label: '100 km' },
              { value: 200, label: '200 km' },
              { value: 300, label: '300 km' },
              { value: 400, label: '400 km' },
              { value: 500, label: '500 km' },
              { value: 600, label: '600 km' },
              { value: 700, label: '700 km' },
              { value: 800, label: '800 km' },
              { value: 900, label: '900 km' },
              { value: 1000, label: '1000 km' }
            ]}
          />
        </Box>

      </FormControl>
      <FormControl
        sx={{
          m: 1
          // width: '100%'
        }}
      >
        <InputLabel id='vendor-name-multiple-select-label'>Vendor</InputLabel>
        <Select
          labelId='vendor-name-multiple-select-label'
          id='vendor-name-multiple-select'
          multiple
          value={[vendors[0]]}
          input={<OutlinedInput id='vendor' />}
          label='Vendor'
        >
          {vendors.map((vendor) => (
            <MenuItem key={vendor} value={vendor}>
              {vendor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          flexDirection: 'row',
          m: 1
        }}
      >
        <InputLabel id='category-name-multiple-select-label'>
          Categories
        </InputLabel>
        <Select
          labelId='category-name-multiple-select-label'
          id='category-name-multiple-select'
          multiple
          value={[foodItems[0]]}
          input={<OutlinedInput id='category' />}
          label='Categories'
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
