import './Visualize.scss'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DataViews from './components/DataViews.jsx';
import { useMediaQuery } from '@mui/material';
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

  const mediaQuery = useMediaQuery(

    '(max-width:50rem)'
  );



  return (
    <Stack
      id={'Visualize'}
      className={'VisualizeComponent'}
      sx={{
        display: !mediaQuery ? 'flex' : 'none',
        minWidth: '90%',
      }}
    >
      <Box>
        <DataViews
          allTrucks={trucks}
          trucks={filterTrucks}
          vendor={vendor}
          foods={foods}
          distance={distance}
          location={location}
        />
      </Box>
    </Stack>
  );
}
