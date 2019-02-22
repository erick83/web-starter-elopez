import React from 'react';
import { Map, Marker, Popup, TileLayer, withLeaflet } from 'react-leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search';
import { getCenter } from 'geolib';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const WrappedSearch = withLeaflet(ReactLeafletSearch);

function parseCenter(arr) {
  const result = getCenter(arr.map(({ lat, lon }) => ({ latitude: lat, longitude: lon })));
  return [result.latitude, result.longitude];
}

function MapComponent({ items, classes }) {
  return (
    <div className={classes.wrapper}>
      <Map
        center={parseCenter(items)}
        zoom={13}
        className={classes.leaflet}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <WrappedSearch
          position="topright"
          inputPlaceholder="Search food in your area ..."
          zoom={13}
          showMarker
          showPopup
          closeResultsOnClick
          openSearchOnLoad
        />
        {items.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lon]}
          >
            <Popup>{item.description}</Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
}

export default withStyles(styles)(MapComponent);
