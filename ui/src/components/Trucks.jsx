// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'leaflet/dist/leaflet.css';
import SanFrancLogo from '../assets/sanfran.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line no-unused-vars
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';


CustomMarker.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node.isRequired,
}

// function CustomMarker({ position, children }: CustomMarkerProps)
function CustomMarker({ position, children }) {
  const map = useMap()
  console.log('map', map)
  return (
    <div>
      <Marker
        // icon={icon}
        position={position}
      >{children}</Marker>
    </div>
  )
}
export default function Trucks() {
  const {
    // eslint-disable-next-line no-unused-vars
    trucks,
    filterTrucks,
    // eslint-disable-next-line no-unused-vars
    location,
    // eslint-disable-next-line no-unused-vars
    vendor,
    // eslint-disable-next-line no-unused-vars
    distance,
    // eslint-disable-next-line no-unused-vars
    foods
  } = useOutletContext();

  // const map = useMap();

  const createCoordinateMarkers = (trucks, limit = 100) => {
    if (trucks.length > limit) {
      trucks = trucks.slice(0, limit);
    }
    return trucks.map((truck) => {
      return (
        <CustomMarker
          key={truck.objectid}
          position={[truck.latitude, truck.longitude]}
        >
          <Popup>
            <Typography
              variant={'h6'}
            >
              {truck.applicant}
            </Typography>
            <Typography
              variant={'subtitle1'}
            >
              {truck.address}
            </Typography>
          </Popup>
        </CustomMarker>
      )
    })
  }
  return (

    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`,
        width: '100%',
        height: '100%',
      }}
    >
      <MapContainer
        style={{
          width: '50vw',
          height: '100%',
        }}
        center={[37.777399395507075, -122.41982705224395]}
        zoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
          {createCoordinateMarkers(filterTrucks)}
      </MapContainer>

    </Box>
  );
}
