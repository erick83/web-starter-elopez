import React from 'react';
import { Map as LeafMap, Marker, Popup, TileLayer } from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';

import geoCenter from '../../utils/geoCenter';
import styles from './styles';

function Map({ items, center, classes }) {
  return (
    <div className={classes.wrapper}>
      <LeafMap
        center={geoCenter(items)}
        zoom={13}
        className={classes.leaflet}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {items.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lon]}
          >
            <Popup>{item.description}</Popup>
          </Marker>
        ))}
      </LeafMap>
    </div>
  );
}

export default withStyles(styles)(Map);
