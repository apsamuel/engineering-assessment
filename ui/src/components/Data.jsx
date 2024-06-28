import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import {
  DataGrid,
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
  styled,
  useTheme
} from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  display: {
    sm: 'none',
    md: 'none',
    lg: 'flex',
  },
  border: 0,
  color: theme.palette.primary.contrastText,
  fontFamily: ['Roboto'].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontFamily: ['Roboto'].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal'
  }
}));
Data.propTypes = {
  setFilterTrucks: PropTypes.func,
  trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.arrayOf(PropTypes.number),
  vendor: PropTypes.string,
  distance: PropTypes.number,
  foods: PropTypes.arrayOf(PropTypes.string)
};
export default function Data({
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

  const columns = [
    { field: 'applicant', headerName: 'Truck Name', flex: 1, maxWidth: 550 },
    { field: 'facilitytype', headerName: 'Truck Type', flex: 0.5, maxWidth: 100},
    { field: 'address', headerName: 'Truck Address', flex: 0.5 },
    {
      field: 'distance',
      headerName: 'Truck Distance',
      flex: 0.5,
      valueGetter: (value, row) =>
        `${
          Math.round(haversine(location, [row.latitude, row.longitude])) / 1000
        } km`
    },
    {
      field: 'fooditems',
      headerName: 'Food Categories',
      flex: 1,
      minWidth: 200,
      maxWidth: 500,

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
            {params.value
              .split(new RegExp('[:;.]', 'g'))
              .map((val) => val.trim().toLowerCase())
              .slice(0, 5)
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
      filtered = filtered.filter((truck) => truck.applicant === vendor);
    }
    if (distance) {
      filtered = filtered.filter(
        (truck) =>
          haversine(location, [truck.latitude, truck.longitude]) / 1000 <
          distance
      );
    }
    if (foods) {
      filtered = filtered.filter((truck) => truck.fooditems.includes(foods));
    }
    setFilteredTrucks(filtered);
    setFilterTrucks(filtered);
  }, [vendor, distance, foods, location, trucks, apiRef, setFilterTrucks]);
  return (
    <Stack
      sx={{
        width: '80%',
        // height: '50%'
      }}
      style={{
      }}
    >
      <StyledDataGrid
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
        density='compact'
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
        // checkboxSelection
        disableSelectionOnClick
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
