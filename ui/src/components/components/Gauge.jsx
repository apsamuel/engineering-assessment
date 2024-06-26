import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// eslint-disable-next-line no-unused-vars
const StyledReactECharts = styled(ReactECharts)(({ theme }) => ({
  height: 250,
}))

Gauge.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.object)
};

export default function Gauge({ trucks = [] }) {
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

  const sortedFrequencies = frequencies
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);


  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646'
          }
        },
        axisLine: {
          lineStyle: {
            width: 40
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: sortedFrequencies,
        title: {
          fontSize: 14
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%'
        }
      }
    ]
  }

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        display: {
          xs: 'none',
          sm: 'none',
          md: 'none',
          lg: 'block',
          xl: 'block'

        }
      }}
    >
      <StyledReactECharts style={{ height: 500}} option={option} />
    </Box>
  );
}
