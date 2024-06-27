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

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.primary.contrastText}`,
        // width: '100vw',
        // height: '100vh',
      }}
    >
      <MapContainer
        style={{
          width: '50vw',
          height: '100%',
        }}
        center={[37.777399395507075, -122.41982705224395]}
        zoom={20}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
          <CustomMarker position={[37.777399395507075, -122.41982705224395]}>
            <Popup>
              <Typography>
                <img src={SanFrancLogo} alt='San Francisco Logo' />
              </Typography>
            </Popup>
          </CustomMarker>
      </MapContainer>

    </Box>
  );
}
