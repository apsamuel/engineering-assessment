import './Map.scss';
import 'leaflet/dist/leaflet.css';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import { vendorToEnrichment } from './config/Tools.js';

CustomMarker.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node.isRequired
};

function CustomMarker({ position, children }) {
  // eslint-disable-next-line no-unused-vars
  const map = useMap();
  return (
    <div>
      <Marker
        // icon={icon}
        position={position}
      >
        {children}
      </Marker>
    </div>
  );
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

  const createCoordinateMarkers = (trucks, limit = 100) => {
    if (trucks.length > limit) {
      trucks = trucks.slice(0, limit);
    }
    return trucks.map((truck) => {
      const enrichment = vendorToEnrichment(truck.applicant);
      return (
        <CustomMarker
          key={truck.objectid}
          position={[truck.latitude, truck.longitude]}
        >
          <Popup>
            <Stack>
            <Box>
            <Typography variant={'h6'}>{truck.applicant}</Typography>
            </Box>
              <Typography variant={'subtitle1'}>{truck.address}</Typography>
            <Box>

              </Box>

            {enrichment && enrichment.siteLink ?
              (
                <Box>
                  <a href={enrichment.siteLink}>Website</a>
                </Box>

              ) : (
                <Box>
                  <a href={`https://www.google.com/search?q=${truck.applicant}`}>Site Search</a>
                </Box>
              )
            }
            {enrichment && enrichment.menuLink ?
              (
                <Box>
                  <a href={enrichment.menuLink}>Menu</a>
                </Box>

              ) : (
                <Box>
                  <a href={`https://www.google.com/search?q=${truck.applicant} menu`}>Menu Search</a>
                </Box>
              )
            }
            {enrichment && enrichment.imageLink ?
            (
              <Box>
                <img
                  src={enrichment.imageLink}
                  alt={truck.applicant}
                  width={100}
                  height={100}
                />
              </Box>
            ) : (
              <Box>
                <a href={`https://www.google.com/search?q=${truck.applicant} images`}>Image Search</a>
              </Box>
            )
            }
            </Stack>
            {/* conditional  */}
          </Popup>
        </CustomMarker>
      );
    });
  };

  return (
    <Stack
      id={'Map'}
      className={'MapComponent'}
    >
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          border: (theme) => `1px solid ${theme.palette.primary.contrastText}`,
          width: '100%',
          height: '50vh',
            minHeight: '250px'
        }}
      >
        <MapContainer
          style={{
            width: '50vw',

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
    </Stack>
  );
}
