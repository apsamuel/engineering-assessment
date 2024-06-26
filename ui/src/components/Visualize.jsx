import Box from '@mui/material/Box';
import Categories from './components/Categories.jsx';
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

  return (
    <Box
      sx={{
        // height: 550,
        width: '100%'

      }}

    >
      <Categories trucks={filterTrucks}/>
      {/* <ReactECharts option={option} /> */}
    </Box>

  );
}