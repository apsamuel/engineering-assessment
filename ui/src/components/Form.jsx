// import { useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
// import DirectionsWalk from '@mui/icons-material/DirectionsWalk';
// import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
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
  // TODO: clean up outlier data
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
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // padding: 2,
        width: {
          // xs: '30%',
          // sm: '50%',
          // md: '60%',
          // lg: '70%',
          // xl: '80%'
        },
        m: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5
        },
        borderRadius: {
          xs: 0,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5
        },
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`
      }}
    >
      {/* distance controls */}
      <FormControl
        variant='filled'
        sx={{
          padding: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Stack
          direction={'column'}
          // spacing={5}
          sx={
            {
              // display: 'flex',
              // flexGrowth: 1,
              // justifyContent: 'center',
            }
          }
        >
          <InputLabel
            id='vendor-distance-slider-label'
            sx={{
              color: 'primary.contrastText'
              // padding: 5
            }}
          >
            <Typography variant='caption'></Typography>
          </InputLabel>


          <Stack direction='row' spacing={2}
            sx={{
              padding: 1,
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
            }}
          >
            {/* <Box><DirectionsWalk/></Box> */}

            <Slider
              // size={'medium'}
              sx={{
                flexGrow: 1
              }}
              label='Distance'
              labelId='vendor-distance-slider-label'
              aria-label='vendor-distance-slider'
              defaultValue={5000}
              getAriaValueText={(value) => `${value} km`}
              // the step may be a little unrealistic for real-world applications, i'm in NYC, the data is reflective of trucks in San Francisco
              step={500}
              shiftStep={1000}
              valueLabelDisplay='auto'
              min={5000}
              max={10000}
              // from 5000 km to 10000 km
              color={'primary.main'}
              marks={[
                { value: 5000, label: '5km' },
                { value: 7500, label: '7.5km' },
                { value: 10000, label: '10km' }
              ]}
              onChange={(_, value) => {
                setDistance(value);
              }}
            />
            {/* <DirectionsCarFilledIcon/> */}
          </Stack>


          <FormHelperText
            sx={{
              color: 'primary.contrastText'
            }}
          >
            Distance (Km)
          </FormHelperText>
        </Stack>
      </FormControl>
      {/*  vendor controls */}
      <FormControl
        variant='filled'
        sx={{
          padding: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Stack sx={{}}>
          <InputLabel
            id='vendor-name-multiple-select-label'
            // variant='filled'
            sx={{
              color: 'primary.contrastText'
              // padding: 5
            }}
          >
            <Typography></Typography>
          </InputLabel>
          <Select
            labelId='vendor-name-multiple-select-label'
            id='vendor-name-multiple-select'
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
          <FormHelperText
            sx={{
              color: 'primary.contrastText'
            }}
          >
            Vendor
          </FormHelperText>
        </Stack>
      </FormControl>
      {/*  food category controls */}
      <FormControl
        variant={'filled'}
        sx={{
          padding: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Stack>
          <InputLabel
            id='category-name-multiple-select-label'
            sx={{
              color: 'primary.contrastText'
            }}
          >
            <Typography></Typography>
          </InputLabel>
          <Select
            variant='filled'
            labelId='category-name-multiple-select-label'
            label='Category'
            id='category-name-multiple-select'
            value={[foodItems[0]]}
            input={
              <OutlinedInput placeholder='Select a Category' id='category' />
            }
            placeholder='Select a Category'
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
          <FormHelperText
            sx={{
              color: 'primary.contrastText'
            }}
          >
            Food
          </FormHelperText>
        </Stack>
      </FormControl>
    </Stack>
  );
}
