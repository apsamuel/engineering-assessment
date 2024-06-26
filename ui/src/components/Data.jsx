import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
// import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import haversine from 'haversine-distance'


Data.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.arrayOf(PropTypes.number),
  vendor: PropTypes.string,
  distance: PropTypes.number,
  foods: PropTypes.arrayOf(PropTypes.string)
}
export default function Data({ trucks = [], location = [], vendor = null, distance = 10000, foods = null}) {
  const [filteredTrucks, setFilteredTrucks] = useState(trucks);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  // console.log('location:', location)
  console.log('filteredTrucks:', filteredTrucks.length)
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
      width: 250,
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
            {params.value.split(':').map(val => val.trim()).slice(0,1).map((category, index) => (
              <Chip
                key={index}
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'flex'
                  },
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


  // trucks = foods ? trucks.filter(truck => truck.fooditems.includes(foods)) : trucks;
  useEffect(() => {
    setFilteredTrucks(
      trucks.filter((truck) =>
        vendor ? truck.applicant === vendor : true &&
        distance ? haversine(location, [truck.latitude, truck.longitude]) / 1000 < distance : true &&
        foods ? truck.fooditems.includes(foods) : true
      )
    )
  }, [vendor, distance, foods, location, trucks]);
  return (
      <div
        style={{ height: 500, width: '100%'}}
      >
        <DataGrid
          rows={filteredTrucks}
          columns={columns}
          autoHeight
          disableAutosize
          disableColumnResize
          loading={filteredTrucks.length === 0}
          initialState={{
            pagination: {
              rowCount: filteredTrucks.length,
              paginationModel: {
                page: 0,
                pageSize: 20
              }
            }
          }}
          pageSizeOptions={[5, 10, 20, 25]}
          checkboxSelection
          disableSelectionOnClick
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </div>
    // </Stack>
  );
}
