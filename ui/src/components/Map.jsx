import './Map.scss';
import 'leaflet/dist/leaflet.css';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import { vendorToEnrichment } from './config/Tools.js';

LocationPin.propTypes = {
  position: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired
};

VendorPin.propTypes = {
  position: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.bool,
  children: PropTypes.node.isRequired
};

MapController.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  trucks: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.arrayOf(PropTypes.object),
  flyToDuration: PropTypes.number
};

const calculateCenter = (trucks) => {
  const latitudes = trucks.map((truck) => Number(truck.latitude));
  const longitudes = trucks.map((truck) => Number(truck.longitude));
  if (
    latitudes.length &&
    latitudes.length > 0 &&
    longitudes.length &&
    longitudes.length > 0
  ) {
    const latitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    const longitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
    console.log('calculated.map.center', { center: [latitude, longitude] });
    return [latitude, longitude];
  }
  console.warn('default.map.center', { message: 'using default center' });
  return [import.meta.env.VITE_LATITUDE, import.meta.env.VITE_LONGITUDE];
};

// eslint-disable-next-line no-unused-vars
const calculateZoom = (trucks, selected) => {
  if (trucks.length) {
    return trucks.length > 100 ? 13 : 15;
  } else {
    return 13;
  }
};

function MapController({
  // trucks,
  center,
  zoom,
  selected,
  // eslint-disable-next-line no-unused-vars
  flyToDuration
}) {
  const map = useMap();

  useEffect(() => {
    // fly to the center of the map on load
    map.flyTo(
      center,
      zoom
    );
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const { lat: latitude, lng: longitude } = layer.getLatLng();
        const position = [latitude, longitude];
        // console.log('marker.position', position);
        const selectedPositions = selected.map((truck) => [
          truck.latitude,
          truck.longitude
        ]);

        if (selectedPositions.includes(position)) {
          console.log('selected.marker', position);
        }
      }
    });
  });
  return null;
}
function VendorPin({ position, selected, children }) {
  return (
    <div>
      <Marker
        // icon={icon}
        icon={
          new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${
              selected ? 'green' : 'blue'
            }.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          })
        }
        position={position}
      >
        {children}
      </Marker>
    </div>
  );
}

function LocationPin({ position, children }) {
  return (
    <div>
      <Marker
        position={position}
        icon={
          new L.Icon({
            iconUrl: `https://img.icons8.com/doodle/48/heart-with-pulse.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          })
        }
      >
        {children}
      </Marker>
    </div>
  )
}
export default function Map() {
  const {
    filterTrucks,
    // eslint-disable-next-line no-unused-vars
    location,
    // eslint-disable-next-line no-unused-vars
    foodVendors,
    // eslint-disable-next-line no-unused-vars
    distance,
    // eslint-disable-next-line no-unused-vars
    foodCategories,
    rowSelection
  } = useOutletContext();

  const [selectedTrucks, setSelectedTrucks] = useState([]);
  const [mapCenter, setMapCenter] = useState([
    37.777399395507075, -122.41982705224395
  ]);
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => {
    console.log('Map', {
      location,
      distance,
      foodVendors,
      foodCategories
    });
    const selected = Array.from(rowSelection, ([key, value]) => ({
      id: key,
      ...value
    }));
    setSelectedTrucks(selected);
    setMapCenter(calculateCenter(filterTrucks));
    setMapZoom(calculateZoom(filterTrucks, selected));
  }, [rowSelection, filterTrucks]);

  return (
    <Stack id={'Map'} className={'MapComponent'}>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          border: (theme) => `1px solid ${theme.palette.primary.contrastText}`,
          width: '100%',
          height: '50vh'
        }}
      >
        <MapContainer
          style={{
            width: '50vw'
          }}
          // center={[37.777399395507075, -122.41982705224395]}
          center={mapCenter}
          zoom={mapZoom}
        >
          <MapController
            center={mapCenter}
            zoom={mapZoom}
            selected={selectedTrucks}
            trucks={filterTrucks}
            flyToDuration={2}
          />
          {/*

            layer ideas
            -- https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}
            -- https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}
            -- https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}
           */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <LayersControl position='topright'>
          <LayersControl.Overlay name='natgeo'>
              <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}' />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='dark'>
              <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='cycle'>
              <TileLayer url='https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png' />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='outdoors'>
              <TileLayer url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png' />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='watercolor'>
              <TileLayer url='https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.png' />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='satellite'>
              <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png' />
            </LayersControl.Overlay>
          </LayersControl>
          <LocationPin
            position={location}
          >
            <Popup>
              <Stack>
                <Box>
                  <Typography>Me</Typography>
                </Box>
              </Stack>
            </Popup>
          </LocationPin>
          {filterTrucks.map((truck, index) => {
            let selected = false;
            const enrichment = vendorToEnrichment(truck.applicant);
            const { id } = truck;
            const selectedIds = selectedTrucks.map((truck) => truck.id);
            if (selectedIds.includes(id)) {
              selected = true;
            }

            return (
              <VendorPin
                selected={selected}
                id={`vendor-pin-${index}`}
                key={truck.objectid}
                position={[truck.latitude, truck.longitude]}
              >
                <Popup>
                  <Stack>
                    <Box>
                      <Typography variant={'h6'}>{truck.applicant}</Typography>
                    </Box>
                    <Box>
                      <Typography variant={'subtitle1'}>
                        {truck.address}
                      </Typography>
                    </Box>

                    <Typography variant={'subtitle1'}>
                      {Number(truck.latitude).toFixed(2)}°
                      {Number(truck.latitude) > 0 ? 'N' : 'S'}
                      {Number(truck.longitude).toFixed()}°
                      {Number(truck.longitude) > 0 ? 'E' : 'W'}
                    </Typography>
                    <Box></Box>

                    {enrichment && enrichment.siteLink ? (
                      <Box>
                        <a href={enrichment.siteLink}>Website</a>
                      </Box>
                    ) : (
                      <Box>
                        <a
                          href={`https://www.google.com/search?q=${truck.applicant}`}
                        >
                          Site Search
                        </a>
                      </Box>
                    )}
                    {enrichment && enrichment.menuLink ? (
                      <Box>
                        <a href={enrichment.menuLink}>Menu</a>
                      </Box>
                    ) : (
                      <Box>
                        <a
                          href={`https://www.google.com/search?q=${truck.applicant} menu`}
                        >
                          Menu Search
                        </a>
                      </Box>
                    )}
                    {enrichment && enrichment.imageLink ? (
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
                        <a
                          href={`https://www.google.com/search?q=${truck.applicant} images`}
                        >
                          Image Search
                        </a>
                      </Box>
                    )}
                  </Stack>
                  {/* conditional  */}
                </Popup>
              </VendorPin>
            );
          })}
        </MapContainer>
      </Box>
    </Stack>
  );
}
