import React from 'react';
import L from 'leaflet';
import { Map as LeafMap, Marker, Popup, TileLayer, withLeaflet } from 'react-leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search';
import { Button } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import CrosshairsGps from '../../assets/icons/CrosshairsGps.svg';
import { getAvgPos, getCurrentPosition } from '../../utils/utils';
import styles from './styles';

const WrappedSearch = withLeaflet(ReactLeafletSearch);

const PositionIcon = new L.Icon({
  iconUrl: CrosshairsGps,
  // shadowUrl: 'leaf-shadow.png',
  iconSize: [25, 25], // size of the icon
  // shadowSize: [50, 64], // size of the shadow
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [10, -1] // point from which the popup should open relative to the iconAnchor
});

class MapComponent extends React.Component {
  state = {
    currentPosition: null,
    zoom: 15,
    showMyPosition: false,
  }

  currentPositionHandler = async (e) => {
    e.preventDefault();
    const currentPosition = await getCurrentPosition();
    this.setState({
      currentPosition,
      showMyPosition: true,
    });
  }

  render() {
    const { currentPosition, zoom, showMyPosition } = this.state;
    const { items, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <LeafMap
          center={currentPosition || getAvgPos(items)}
          zoom={zoom}
          className={classes.leaflet}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Button
            variant="contained"
            className={classes.currentLocation}
            onClick={this.currentPositionHandler}
          >
            <LocationOn /> Use my location
          </Button>
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
          {showMyPosition && (
            <Marker position={currentPosition} icon={PositionIcon}>
              <Popup>My Location</Popup>
            </Marker>
          )}
        </LeafMap>
      </div>
    );
  }
}

export default withStyles(styles)(MapComponent);
