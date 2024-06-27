import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// eslint-disable-next-line no-unused-vars
const StyledReactECharts = styled(ReactECharts)(({ theme }) => ({
  height: 550,
}))

Gauge.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.object)
};

export default function Gauge({ trucks = [] }) {
  // TODO: positioning the gauge labels/legend
  // rings
    // trucks total (all trucks)
      // approved trucks (all trucks)
        // approved trucks with fooditems (all trucks)
          // approved trucks with fooditems and selected categories (filtered trucks)
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
      const categoriesLength = categories.length;
      console.log('offset.center', {
        title: {
          offsetCenter: `${((categories.indexOf(category) / categoriesLength) * 100) - 10.0}%`
        },
        detail: {
          offsetCenter: `${((categories.indexOf(category) / categoriesLength) * 100) - 15.0}%`
        }

      })
      frequencies.push({
        name: category,
        value: 1,
        title: {
          offsetCenter: [
            0, `${((categories.indexOf(category) / categoriesLength) * 100) + 20.0}%`
          ]
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [
            0, `${((categories.indexOf(category) / categoriesLength) * 100) + 25.0}%`
          ]
        }
      });
    }
  }

  const sortedFrequencies = frequencies
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);


  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: true
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
          show: true,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          show: true,
          distance: 50
        },
        data: sortedFrequencies,
        title: {
          fontSize: (sortedFrequencies.length === 1) ? 20 : 15,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 12,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 0.1,
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
      <StyledReactECharts  option={option} />
    </Box>
  );
}
