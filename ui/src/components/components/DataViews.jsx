import './DataViews.scss';
import React from 'react'
// import ReactDOM from 'react-dom/client'
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
import { parseFoodItems, categoryToEmoji } from '../config/Tools.js';

// TODO: import from ThemedComponents
const StyledReactECharts = styled(ReactECharts)(({ theme }) => ({
  height: 250,
  border: `1px solid ${theme.palette.primary.contrastText}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(5)
}));
DataViews.propTypes = {
  allTrucks: PropTypes.arrayOf(PropTypes.object),
  trucks: PropTypes.arrayOf(PropTypes.object),
  vendor: PropTypes.string,
  foodCategories: PropTypes.string,
  distance: PropTypes.number,
  location: PropTypes.arrayOf(PropTypes.number)
};
export default function DataViews({
  // eslint-disable-next-line no-unused-vars
  allTrucks = [],
  trucks = [],
  vendor,
  foodCategories,
  distance,
  location
}) {
  const getUniqueVendors = (data) => {
    return Array.from(new Set(data.map((truck) => truck.applicant)));
  };

  const getUniqueCategories = (data) => {
    return Array.from(
      new Set(
        data
          .map((truck) => truck.fooditems)
          .filter(Boolean)
          .join(';')
          .split(new RegExp('[;:.]', 'g'))
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean)
      )
    );
  };

  const getAllCategories = (data) => {
    return data
      .map((truck) => truck.fooditems)
      .filter(Boolean)
      .join(';')
      .split(new RegExp('[;:.]', 'g'))
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
  };

  // const prettifyCategories = (foodItems) => {
  //   const items = foodItems
  //     .split(new RegExp('[;:.]', 'g'))
  //     // remove any empty strings
  //     .map((item) => item.trim())
  //     .map((item) => item.toLowerCase())
  //     // if the item contains spaces, capitalize each word
  //     .map((item) =>
  //       item
  //         .split(' ')
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(' ')
  //     )
  //     // very specific updates
  //     .map((item) =>
  //       item.replace(
  //         'all types of food except for bbq on site per fire safety',
  //         'General'
  //       )
  //     )
  //     .map((item) =>
  //       item.replace(
  //         'asian fusion - japanese sandwiches/sliders/misubi',
  //         'Asian Fusion'
  //       )
  //     )
  //     .map((item) =>
  //       item.replace(
  //         'daily rotating menus consisting of various local & organic vegetable',
  //         'Local Organic'
  //       )
  //     )
  //     .map((item) =>
  //       item.replace('pre-packaged swiches', 'Packaged Sandwiches')
  //     )
  //     .filter(Boolean);

  //   const itemsLength = items.length;
  //   return itemsLength > 3 ? items.slice(0, 3).join(', ') : items.join(', ');
  // };

  const optionMap = {
    gauge: (data) => {
      return {
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
              fontSize: data.length === 1 ? 20 : 15
            },
            detail: {
              width: 50,
              height: 14,
              fontSize: 12,
              color: 'inherit',
              borderColor: 'inherit',
              borderRadius: 20,
              borderWidth: 0.1,
              formatter: '{value}'
            }
          }
        ]
      };
    },
    pie: (data) => {
      return {
        toolbox: {
          show: true,
          feature: {
            // mark: { show: true },
            dataView: {
              show: true,
              readOnly: false,
              optionToContent: function (opt) {
                const data = opt.series[0].data
                console.log('data:', data)
                // return `<h1>foo bar</h1>`
                const el = React.createElement(<Typography>foo bar</Typography>)
                return el
                // return (
                //   <Typography
                //     sx={{
                //       display: 'flex',
                //       border: (theme) => `1px solid ${theme.palette.primary.contrastText}`,
                //     }}
                //   >
                //     <span>{JSON.stringify(Object.keys(opt), null, 2)}</span>
                //   </Typography>
                // )
              }
            },
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
            data: [...data]
          }
        ]
      };
    },
    treemap: (data) => {
      return {
        series: [
          {
            name: 'Vendors',
            // visibleMin: 30,
            label: {
              show: true,
              formatter: '{b}'
            },
            type: 'treemap',
            data: data.length > 50 ? data.slice(0, 50) : data
          }
        ]
      };
    },
    // TODO: fix sunburst chart, it is not rendering properly, names are too long
    sunburst: (data) => {
      return {
        series: [
          {
            name: 'Vendors',
            // visibleMin: 25,
            type: 'sunburst',
            data: data.length > 50 ? data.slice(0, 50) : data
          }
        ]
      };
    }
  };

  const chartTypes = Object.keys(optionMap);

  const [option, setOption] = useState('pie');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    // TODO: the data structure needs to be reworked
    const getSunburstData = (data) => {
      const sunburstData = [];
      const vendors = getUniqueVendors(data);
      for (const vendor of vendors) {
        sunburstData.push({
          name: vendor,
          value: data.filter((truck) => truck.applicant === vendor).length,
          children: data
            .filter((truck) => truck.applicant === vendor)
            .map((truck) => {
              return {
                // name: prettifyCategories(truck.fooditems),
                name: parseFoodItems(truck.fooditems)
                  .map((category) => categoryToEmoji(category))
                  .slice(0, 3)
                  .join(' '),
                value: getUniqueCategories([truck]).length
              };
            })
        });
      }

      return sunburstData.length > 30
        ? sunburstData.slice(0, 30)
        : sunburstData;
    };

    // TODO: investigate how to improve usability of the pie, popups, backlinks
    const getPieData = (data) => {
      const pieData = [];
      const categories = getAllCategories(data);
      // collect the frequency of each category
      for (const category of categories) {
        if (pieData.find((entry) => entry.name === category)) {
          pieData.find((entry) => entry.name === category).value++;
        } else {
          pieData.push({ name: category, value: 1 });
        }
      }
      return pieData.sort((a, b) => b.value - a.value).slice(0, 10);
    };

    // TODO: presentation needs to be reworked
    const getTreeMapData = (data) => {
      const treeMapData = [];
      const vendors = getUniqueVendors(data);
      for (const vendor of vendors) {
        treeMapData.push({
          name: vendor,
          value: data.filter((truck) => truck.applicant === vendor).length,
          children: data
            .filter((truck) => truck.applicant === vendor)
            .map((truck) => {
              return {
                name: truck.address,
                value: Math.round(
                  haversineDistance(location, [
                    truck.latitude,
                    truck.longitude
                  ]) / 1000
                )
              };
            })
        });
      }
      return treeMapData;
    };

    const getGaugeData = (data) => {
      return [
        {
          name: 'Unique Vendors',
          value: getUniqueVendors(data).length,
          title: {
            offsetCenter: ['0%', '-30%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-20%']
          }
        },
        {
          name: 'Food Categories',
          value: getUniqueCategories(data).length,
          title: {
            offsetCenter: ['0%', '0%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%']
          }
        },
        {
          name: 'Unique Locations',
          value: data.length,
          title: {
            offsetCenter: ['0%', '30%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '40%']
          }
        }
      ];
    };

    if (option === 'pie') {
      setChartData(getPieData(trucks));
    }
    if (option === 'gauge') {
      setChartData(getGaugeData(trucks));
    }
    if (option === 'treemap') {
      setChartData(getTreeMapData(trucks));
    }
    if (option === 'sunburst') {
      setChartData(getSunburstData(trucks));
    }
  }, [
    trucks,
    option,
    location
  ]);

  return (
    <Stack
      id={'DataViews'}
      className='DataComponent'
    >
      <Stack direction={'row'} spacing={5}>
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
        <Stack
          direction='row'
          spacing={2}
          sx={{
            color: (theme) => theme.palette.primary.contrastText
          }}
        >
          <Box>
            <Typography
              variant='overline'
            >{trucks.length} Trucks</Typography>
          </Box>
          <Box>
            <Typography
              variant='overline'
            >{' '}{(vendor === 'All' || !vendor) ? ' All Vendors' : vendor}{' '}</Typography>
          </Box>
          <Box>
            <Typography
              variant='overline'
            >{' '}{(foodCategories === 'All' || !foodCategories) ? ' All Categories' : ` ${foodCategories}`}{' '}</Typography>
          </Box>
          <Box>
            <Typography
              variant='overline'
            >{' '}Within {` ${distance}`} km</Typography>
          </Box>

        </Stack>
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
        <StyledReactECharts
          style={{ height: 500 }}
          option={optionMap[option](chartData)}
        />
      </Box>
    </Stack>
  );
}
