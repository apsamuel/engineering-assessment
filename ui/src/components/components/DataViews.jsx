import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import haversineDistance from 'haversine-distance';

// eslint-disable-next-line no-unused-vars
const StyledReactECharts = styled(ReactECharts)(({ theme }) => ({
  height: 250,
}))
DataViews.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.object),
  vendor: PropTypes.string,
  distance: PropTypes.number,
  location: PropTypes.arrayOf(PropTypes.number),
};
export default function DataViews({ trucks = [], vendor, distance, location }) {
  const frequencies = [];
  const treeMapData = [];

  const vendors = Array.from(
    new Set(
      trucks
        .map((truck) => truck.applicant)
        .filter(Boolean)
    )
  );
  // we need to get a count for each vendor, how many times they appear in the list

  for (const vendor of vendors) {
    treeMapData.push({
      name: vendor,
      value: trucks.filter((truck) => truck.applicant === vendor).length,
      // the nodes children will be each store that belongs to the vendor, with the value being its distance from you
      children: trucks
        .filter((truck) => truck.applicant === vendor)
        .map((truck) => {
          return {
            name: truck.address,
            value: Math.round(haversineDistance(location, [
              truck.latitude,
              truck.longitude
            ]) / 1000)
          }
        })
    })
  }

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

  const optionMap = {
    gauge: (data) => {
      return {
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
            data,
            title: {
              fontSize: (data.length === 1) ? 20 : 15,
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
    },
    pie: (data) => {
      return {
        toolbox: {
          show: true,
          feature: {
            // mark: { show: true },
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
              ...data
            ]
          }
        ]
      }
    },
    treemap: (data) => {
      return {
        series: [
          {
            name: 'Vendors',
            label: {
              show: true,
              formatter: '{b}'
            },
            type: 'treemap',
            data
          }
        ]
      }
    }
  }

  const chartTypes = Object.keys(optionMap)

  const [option, setOption] = useState('pie')
  const [chartData, setChartData] = useState(sortedFrequencies)

  // console.log('chart data', chartData)
  useEffect(() => {
    if (option==='pie') {
      setChartData(sortedFrequencies)
    }
    if (option==='gauge') {
      setChartData(sortedFrequencies)
    }
    if (option==='treemap') {
      console.log('treemap data', treeMapData)
      setChartData(treeMapData)
    }

    // console.log('chart data', chartData)
  }, [sortedFrequencies, treeMapData, option])
  // const options =
  return (
    <Stack>
    <Stack
      direction={'row'}
      spacing={5}
    >
    <FormControl
      sx={{
        width: '20%'
      }}
    >
      <Select
        size='small'
        variant='filled'
        label='Graph Type'
        value={option}
        onChange={(event) => {
          setOption(event.target.value);
        }}
      >
        {chartTypes.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Box>
      <Typography>
        {trucks.length} Trucks ({vendor || 'All Vendors'})
      </Typography>

    </Box>
    </Stack>

    <Box
      sx={{
        // flexGrow: 1,
        width: '100%',
        padding: (theme) => theme.spacing(1),
        // border: (theme) =>
        //   `1px solid ${theme.palette.primary.contrastText}`,
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
      <StyledReactECharts style={{ height: 500}} option={optionMap[option](sortedFrequencies)} />
    </Box>
    </Stack>

  );
}
