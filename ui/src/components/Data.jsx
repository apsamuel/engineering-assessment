import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
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


Data.propTypes = {
  // id: PropTypes.string,
  setFilterTrucks: PropTypes.func,
  trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.arrayOf(PropTypes.number),
  vendor: PropTypes.string,
  distance: PropTypes.number,
  foods: PropTypes.arrayOf(PropTypes.string)
};
export default function Data({
  // id = 'DataGridController',
  trucks = [],
  location = [],
  vendor = null,
  distance = 10000,
  foods = [],
  setFilterTrucks = () => {
    console.log('setFilterTrucks not implemented');
  }
}) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  let [filteredTrucks, setFilteredTrucks] = useState(trucks);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
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
        .map((item) => item.replace('daily rotating menus consisting of various local & organic vegetable', 'Local Organic'))
        .map((item) => item.replace('pre-packaged swiches', 'Sandwiches'))
        .map((item) => item.replace('peruvian food served hot', 'Peruvian Cuisine'))
        .map((item) => {
          return item === 'tacos burritos quesadillas tortas pupusas flautas tamales' ?  ['tacos', 'burritos', 'quesadillas', 'tortas', 'pupusas', 'flautas', 'tamales'] : item;
        })
        .flat()
    }
    return [];
  }

  const columns = [
    // TODO: render Tooltip for applicant containing fooditems
    { field: 'applicant', headerName: 'Truck Name', flex: 0.5, minWidth: 250 },
    { field: 'facilitytype', headerName: 'Truck Type', flex: 0.2},
    { field: 'address', headerName: 'Truck Address', flex: 0.333 },
    {
      field: 'distance',
      headerName: 'Truck Distance',
      flex: 0.3333,
      valueGetter: (value, row) =>
        `${
          Math.round(haversine(location, [row.latitude, row.longitude])) / 1000
        } km`
    },
    // TODO: use icons or emoji mappings for food items
    {
      field: 'fooditems',
      headerName: 'Food Categories',
      flex: 0.333,
      renderCell: (params) => {
        return (
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            direction={'row'}
            // spacing={1}
          >
            {
              parseFoodItems(params.value)
              .slice(0, 3)
              .map((category, index) => (
                <Chip
                  key={index}
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'flex'
                    },
                    color: 'primary.contrastText'
                  }}
                  size='small'
                  // key={category}
                  label={category}
                />
              ))}
          </Stack>
        );
      }
    }
  ];

  useEffect(() => {
    let filtered = trucks;
    if (vendor) {
      console.log('vendor', vendor)
      filtered = vendor === 'All' ? trucks : filtered.filter((truck) => truck.applicant === vendor);
    }
    if (distance) {
      filtered = filtered.filter(
        (truck) =>
          haversine(location, [truck.latitude, truck.longitude]) / 1000 <
          distance
      );
    }
    if (foods) {
      console.log('foods', foods)
      filtered = foods === 'All' ? trucks : filtered.filter((truck) => truck.fooditems.includes(foods));
    }
    setFilteredTrucks(filtered);
    setFilterTrucks(filtered);
  }, [vendor, distance, foods, location, trucks, apiRef, setFilterTrucks]);
  return (
    <Stack
      id={'DataGridController'}
      sx={{
        minWidth: '50%',
        maxWidth: '80%',
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
        density={'compact'}
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
      />
    </Stack>
  );
}
