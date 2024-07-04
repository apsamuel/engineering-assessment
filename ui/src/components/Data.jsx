import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line no-unused-vars
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import {
  // DataGrid,
  GridToolbar,
  useGridApiRef
  // gridClasses
} from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import haversine from 'haversine-distance';
// import Box from '@mui/material/Box';
import {
  // alpha,
  // darken,
  // lighten,
  // styled,
  useTheme
} from '@mui/material/styles';

import { StyledDataGrid } from './components/ThemedComponents.jsx';
import { categoryToEmoji } from './config/Tools.js';


Data.propTypes = {
  // id: PropTypes.string,
  setFilterTrucks: PropTypes.func,
  trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.arrayOf(PropTypes.number),
  foodVendors: PropTypes.string,
  distance: PropTypes.number,
  foodCategories: PropTypes.arrayOf(PropTypes.string)
};
export default function Data({
  trucks = [],
  location = [],
  foodVendors = null,
  distance = 10000,
  foodCategories = [],
  setFilterTrucks = () => {
    console.log('setFilterTrucks not implemented');
  }
}) {
  const browserLocation = useLocation();
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  let [rowSelectionModel, setRowSelectionModel] = useState([]);
  let [filteredTrucks, setFilteredTrucks] = useState(trucks);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  });
  const apiRef = useGridApiRef();

  const parseFoodItems = (fooditems) => {
    if (fooditems) {
      return fooditems
        .split(new RegExp('[:;.]', 'g'))
        .map((item) => item.trim())
        .map((item) => item.toLowerCase())
        .map((item) => item.replace(
          new RegExp(`(${[
            'all types of food except for bbq on site per fire safety',
            'various menu items & drinks',
            'multiple food trucks & food types'
          ]})`, 'g')
        ), 'General Market')
        .map((item) => item.replace(
          'asian fusion - japanese sandwiches/sliders/misubi', 'Asian Fusion'
        ))
        .map((item) => item.replace('vegetable and meat sandwiches filled with asian-flavored meats and vegetables', 'Sandwiches'))
        .map((item) => item.replace('daily rotating menus consisting of various local & organic vegetable', 'Local Organic'))
        .map((item) => item.replace('pre-packaged swiches', 'Sandwiches'))
        .map((item) => item.replace('peruvian food served hot', 'Peruvian Cuisine'))
        .map((item) => {
          return item === 'tacos burritos quesadillas tortas pupusas flautas tamales' ?  ['tacos', 'burritos', 'quesadillas', 'tortas', 'pupusas', 'flautas', 'tamales'] : item;
        })
        .filter(Boolean)
        // upper case first letter of each word
        .map((item) =>
          item.split ? item.split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ') : item
        )
        // .map((item) => item.replace(/[^\s+|\s+$]/g, ''))
        .flat()
    }
    return [];
  }

  const columns = [
    { field: 'applicant', headerName: 'Vendor', flex: 0.5, minWidth: 250,
      renderCell: (params) => {
        const fooditems = parseFoodItems(params.row.fooditems);
        return (
          <Tooltip
            arrow
            title={
              Array.from(
                new Set(
                  fooditems.map(
                    (category) => `${categoryToEmoji(category)}`
                  )
                )
              )
              .join(' | ')
            }
            placement='top-start'
          >
            <span>{params.value}</span>
          </Tooltip>
        );
      }
    },
    { field: 'facilitytype', headerName: 'Type', flex: 0.2,
      renderCell: (params) => {
        return (
          <span>
            {params.row.facilitytype}
          </span>
        )
      }
    },
    {
      field: 'address', headerName: 'Address', flex: 0.333,
      renderCell: (params) => {
        // get latitude and longitude
        const lat = params.row.latitude;
        const lon = params.row.longitude;

        return (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
            target='_blank'
            rel='noreferrer'
          >{params.row.address}</a>
        )
      }
    },
    {
      field: 'distance',
      headerName: 'Distance',
      flex: 0.3333,
      valueGetter: (value, row) =>
        `${
          Math.round(haversine(location, [row.latitude, row.longitude])) / 1000
        } km`
    },
    // TODO: use icons or emoji mappings for food items
    {
      field: 'fooditems',
      headerName: 'Categories',
      flex: 0.55,
      renderCell: (params) => {
        return (
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            direction={'row'}
            spacing={1}
          >
            {
              parseFoodItems(params.value)
              // .slice(0, 3)
              .map((category, index) => (
                <Tooltip
                  arrow
                  title={category}
                  key={`${params.row.objectid}-${index}-${category}-tip`}
                >
                <Chip
                  key={`${params.row.objectid}-${index}-${category}-chip`}
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'flex'
                    },
                    color: 'primary.contrastText'
                  }}
                  size='small'
                  // key={category}
                  // label={category}
                  // label={`${categoryToEmoji(category)} ${category}`}
                  label={categoryToEmoji(category)}
                />
                </Tooltip>

              ))}
          </Stack>
        );
      }
    }
  ];

  useEffect(() => {
    let filtered = trucks;
    if (foodVendors) {
      filtered = foodVendors === 'All' ? filtered : filtered.filter((truck) => truck.applicant.toLowerCase() === foodVendors.toLowerCase());
    }
    if (distance) {
      filtered = filtered.filter(
        (truck) =>
          haversine(location, [truck.latitude, truck.longitude]) / 1000 <
          distance
      );
    }
    if (foodCategories) {
      filtered = foodCategories === 'All' ? filtered : filtered.filter((truck) => truck.fooditems.toLowerCase().includes(foodCategories.toLowerCase()));
    }
    setFilteredTrucks(filtered);
    setFilterTrucks(filtered);
  }, [foodVendors, distance, foodCategories, location, trucks, apiRef, setFilterTrucks]);
  return (
    <Stack
      id={'DataGridController'}
      sx={{
        // minWidth: '40%',
        // maxWidth: '100%',
        width:  '80%',
      }}
      style={{
      }}
    >
      <StyledDataGrid
        id={'DataGrid'}
        sx={{
          boxShadow: 1,
          border: 1,
          borderColor: 'primary.light',
          '& .MuiDataGrid-autoHeight': {},
          '& .MuiDataGrid-toolbarContainer': {
            backgroundColor: 'primary.light'
          }
        }}
        apiRef={apiRef}
        density={
          browserLocation.pathname === '/' ? 'standard' : 'compact'
        }
        disableSelectionOnClick
        checkboxSelection
        disableRowSelectionOnClick
        rows={filteredTrucks}
        columns={columns}
        autoHeight
        autoColumnHeights
        loading={filteredTrucks.length === 0}
        slots={{
          toolbar: GridToolbar
        }}
        initialState={{
          pagination: {
            rowCount: filteredTrucks.length,
            paginationModel: {
              page: paginationModel.page,
              pageSize: 20
            }
          }
        }}
        pageSizeOptions={[5, 10, 20, 25]}
        paginationModel={paginationModel}
        onSortModelChange={(model) => {
          console.log('data.sortModel', model);
        }}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
        }}
        onStateChange={(state) => {
          setPaginationModel(state.pagination.paginationModel);
        }}
        onRowSelectionModelChange={(newRowSelectionModel, details) => {
          // const { data } = details.api.caches.;
          console.log('data.rowSelectionModel', newRowSelectionModel);
          console.log('data.rowSelectionModel.details', details)
          setRowSelectionModel([
            ...newRowSelectionModel
          ]);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </Stack>
  );
}
