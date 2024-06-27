import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import {
  DataGrid,
  GridToolbar,
  useGridApiRef,
  // gridClasses
} from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import haversine from 'haversine-distance'
import Box from '@mui/material/Box';
import {
  // alpha,
  // darken,
  // lighten,
  styled,
  useTheme
} from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)(({ theme}) => ({
  border: 0,
  color: theme.palette.primary.contrastText,
  fontFamily: [
    'Roboto',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontFamily: [
      'Roboto',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
  },
}))
Data.propTypes = {
  setFilterTrucks: PropTypes.func,
  trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.arrayOf(PropTypes.number),
  vendor: PropTypes.string,
  distance: PropTypes.number,
  foods: PropTypes.arrayOf(PropTypes.string)
}
export default function Data({
  trucks = [], location = [], vendor = null, distance = 10000, foods = [],
  setFilterTrucks = () => { console.log('setFilterTrucks not implemented') }
}) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  let [filteredTrucks, setFilteredTrucks] = useState(trucks);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const apiRef = useGridApiRef();

  const columns = [
    { field: 'applicant', headerName: 'Vendor', minWidth: 250, maxWidth: 350 },
    { field: 'facilitytype', headerName: 'Type', minWidth: 100, maxWidth: 200 },
    { field: 'address', headerName: 'Address', width: 250 },
    {
      field: 'distance',
      headerName: 'Distance',
      width: 200,
      valueGetter: (value, row) => `${Math.round(haversine(location, [row.latitude, row.longitude])) / 1000} km`
    },
    {
      field: 'fooditems',
      headerName: 'Foods',
      minWidth: 150,
      maxWidth: 350,
      width: 350,
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
            {params.value.split(new RegExp('[:;]', 'g')).map(val => val.trim()).slice(0, 5).map((category, index) => (
              <Chip
                key={index}
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'flex'
                  },
                  color: 'primary.contrastText',
                }}
                size='small'
                // key={category}
                label={category}
              />
            ))}
          </Stack>
        )
      }
    }
  ];

  useEffect(() => {
    let filtered = trucks
    if (vendor) {
      filtered = filtered.filter((truck) => truck.applicant === vendor)
    }
    if (distance) {
      filtered = filtered.filter((truck) => haversine(location, [truck.latitude, truck.longitude]) / 1000 < distance)
    }
    if (foods) {
      filtered = filtered.filter((truck) => truck.fooditems.includes(foods))
    }
    setFilteredTrucks(
      filtered
    )
    setFilterTrucks(filtered)

  }, [vendor, distance, foods, location, trucks, apiRef, setFilterTrucks]);
  return (
      <Box
        style={{
          width: '100%',
          // color: 'primary.contrastText',
        }}
      >
        <StyledDataGrid
          sx={{
            boxShadow: 1,
            border: 1,
            // borderColor: 'primary.contrastText',
            // color: 'primary.contrastText',
            borderColor: 'primary.light',
            '& .MuiDataGrid-autoHeight': {
            },
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: 'primary.light',
            }
          }}
          apiRef={apiRef}
          density='compact'
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
          checkboxSelection
          disableSelectionOnClick
          paginationModel={paginationModel}
          onSortModelChange={(model) => {
            console.log('data.sort.update', model)
          }}
          onPaginationModelChange={(model) => {
            setPaginationModel(model)
          }}
          onStateChange={(state) => {
            setPaginationModel(state.pagination.paginationModel)
          }}
        />
      </Box>
  );
}
