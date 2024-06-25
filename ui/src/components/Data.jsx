// import { useState } from 'react';
import Stack from '@mui/material/Stack';
// import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import haversine from 'haversine-distance'


Data.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.arrayOf(PropTypes.number)
}
export default function Data({ trucks = [], location = []}) {
  console.log('location:', location)
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

  return (
      <div
        style={{ height: 500, width: '100%'}}
      >
        <DataGrid
          rows={trucks}
          columns={columns}
          autoHeight
          disableAutosize
          disableColumnResize
          loading={trucks.length === 0}
          initialState={{
            pagination: {
              rowCount: trucks.length,
              paginationModel: {
                page: 0,
                pageSize: 20
              }
            }
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          onPaginationModelChange={(params) => {console.log(params)}}
        />
      </div>
    // </Stack>
  );
}
