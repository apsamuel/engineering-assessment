import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

Categories.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.object)
};
export default function Categories({ trucks = [] }) {
  const frequencies = [];
  const categories = trucks
    .map((truck) => truck.fooditems)
    .filter(Boolean)
    .join(';')
    .split(new RegExp('[;:.]', 'g'))
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  for (const category of categories) {
    if (frequencies.find((frequency) => frequency.name === category)) {
      frequencies.find((frequency) => frequency.name === category).value++;
    } else {
      frequencies.push({ name: category, value: 1 });
    }
  }

  // console.log(frequencies)

  // sort frequencies
  const sortedFrequencies = frequencies
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const option = {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          ...sortedFrequencies
        ]
      }
    ]
  };

  // const options =
  return (
    <Box style={{width: '100%'}}>
      <ReactECharts option={option} />
    </Box>
  );
}
