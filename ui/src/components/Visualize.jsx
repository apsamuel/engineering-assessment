import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Categories from './components/Categories.jsx';
import Gauge from './components/Gauge.jsx';
import { useOutletContext } from 'react-router-dom';

export default function Visualize() {
  const {
    // eslint-disable-next-line no-unused-vars
    trucks,
    filterTrucks,
    // eslint-disable-next-line no-unused-vars
    location,
    // eslint-disable-next-line no-unused-vars
    vendor,
    // eslint-disable-next-line no-unused-vars
    distance,
    // eslint-disable-next-line no-unused-vars
    foods
  } = useOutletContext();

  console.log('visualize', {
    trucks: trucks.length,
    filteredTrucks: filterTrucks.length
  });

  return (
    <Stack
      sx={{
        display: {
          xs: 'none',
          sm: 'none',
          md: 'none',
          lg: 'block',
          xl: 'block'
        },
        padding: {
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2
        },
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%'
        }
      }}
    >
      <Box>
        <Categories trucks={filterTrucks} />
      </Box>
      <Box>
        <Gauge trucks={filterTrucks} />
      </Box>
    </Stack>
  );
}
