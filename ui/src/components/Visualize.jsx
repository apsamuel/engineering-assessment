import Box from '@mui/material/Box';
import ReactECharts from 'echarts-for-react';
import Categories from './components/Categories.jsx';
import { useOutletContext } from 'react-router-dom';
// import PropTypes from 'prop-types';


export default function Visualize() {
  const {
    trucks,
    filterTrucks,
    location,
    vendor,
    distance,
    foods
  } = useOutletContext();
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  return (
    <Box style={{width: '100%'}}>
      <Categories trucks={filterTrucks}/>
      {/* <ReactECharts option={option} /> */}
    </Box>

  );
}