import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import haversine from 'haversine-distance'
import Box from '@mui/material/Box';
// import { darken, lighten, styled } from '@mui/material/styles';

// const getBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

// const getHoverBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

// const getSelectedBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

// const getSelectedHoverBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

// const StyledDataGrid = styled(DataGrid(({ theme }) => ({
//   '& .super-app-theme--Open': {
//     backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
//     '&:hover': {
//       backgroundColor: getHoverBackgroundColor(
//         theme.palette.info.main,
//         theme.palette.mode,
//       ),
//     },
//     '&.Mui-selected': {
//       backgroundColor: getSelectedBackgroundColor(
//         theme.palette.info.main,
//         theme.palette.mode,
//       ),
//       '&:hover': {
//         backgroundColor: getSelectedHoverBackgroundColor(
//           theme.palette.info.main,
//           theme.palette.mode,
//         ),
//       },
//     },
//   },
//   '& .super-app-theme--Filled': {
//     backgroundColor: getBackgroundColor(
//       theme.palette.success.main,
//       theme.palette.mode,
//     ),
//     '&:hover': {
//       backgroundColor: getHoverBackgroundColor(
//         theme.palette.success.main,
//         theme.palette.mode,
//       ),
//     },
//     '&.Mui-selected': {
//       backgroundColor: getSelectedBackgroundColor(
//         theme.palette.success.main,
//         theme.palette.mode,
//       ),
//       '&:hover': {
//         backgroundColor: getSelectedHoverBackgroundColor(
//           theme.palette.success.main,
//           theme.palette.mode,
//         ),
//       },
//     },
//   },
//   '& .super-app-theme--PartiallyFilled': {
//     backgroundColor: getBackgroundColor(
//       theme.palette.warning.main,
//       theme.palette.mode,
//     ),
//     '&:hover': {
//       backgroundColor: getHoverBackgroundColor(
//         theme.palette.warning.main,
//         theme.palette.mode,
//       ),
//     },
//     '&.Mui-selected': {
//       backgroundColor: getSelectedBackgroundColor(
//         theme.palette.warning.main,
//         theme.palette.mode,
//       ),
//       '&:hover': {
//         backgroundColor: getSelectedHoverBackgroundColor(
//           theme.palette.warning.main,
//           theme.palette.mode,
//         ),
//       },
//     },
//   },
//   '& .super-app-theme--Rejected': {
//     backgroundColor: getBackgroundColor(
//       theme.palette.error.main,
//       theme.palette.mode,
//     ),
//     '&:hover': {
//       backgroundColor: getHoverBackgroundColor(
//         theme.palette.error.main,
//         theme.palette.mode,
//       ),
//     },
//     '&.Mui-selected': {
//       backgroundColor: getSelectedBackgroundColor(
//         theme.palette.error.main,
//         theme.palette.mode,
//       ),
//       '&:hover': {
//         backgroundColor: getSelectedHoverBackgroundColor(
//           theme.palette.error.main,
//           theme.palette.mode,
//         ),
//       },
//     },
//   },
// })))

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
  let [filteredTrucks, setFilteredTrucks] = useState(trucks);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const apiRef = useGridApiRef();

  const columns = [
    { field: 'applicant', headerName: 'Vendor', width: 200 },
    { field: 'facilitytype', headerName: 'Type', width: 150 },
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
            {params.value.split(new RegExp('[:;]', 'g')).map(val => val.trim()).slice(0, 3).map((category, index) => (
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
    // apiRef.current.setPageSize(paginationModel.pageSize)
    // apiRef.current.setPage(paginationModel.page)

    let filtered = trucks
    if (vendor) {
      filtered = filtered.filter((truck) => truck.applicant === vendor)
    }
    if (distance) {
      filtered = filtered.filter((truck) => haversine(location, [truck.latitude, truck.longitude]) / 1000 < distance)
    }
    if (foods) {
      console.log('foods', foods)
      filtered = filtered.filter((truck) => truck.fooditems.includes(foods))
    }
    setFilteredTrucks(
      filtered
      // trucks.filter((truck) =>
      //   vendor ? truck.applicant === vendor : true &&
      //   distance ? haversine(location, [truck.latitude, truck.longitude]) / 1000 < distance : true &&
      //   foods ? truck.fooditems.includes(foods) : true
      // )
    )
    setFilterTrucks(filtered)

  }, [vendor, distance, foods, location, trucks, apiRef, setFilterTrucks]);
  return (
      <Box
        style={{
          height: 500,
          width: '100%',
          color: 'primary.contrastText',
        }}
      >
        <DataGrid
          sx={{
            color: 'primary.contrastText',
          }}
          apiRef={apiRef}
          density='compact'
          rows={filteredTrucks}
          columns={columns}
          autoHeight
          loading={filteredTrucks.length === 0}
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
            console.log('sort model change', model)
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
