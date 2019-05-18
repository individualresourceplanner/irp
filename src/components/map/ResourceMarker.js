import React from 'react';
import { MapView } from 'expo';
// import styles from './ResourceMarker.scss';

const { Marker } = MapView;

export default function ResourceMarker(props) {
  const { resource } = props;
  const { title, description, place } = resource;

  const coordinate = {
    latitude: place.location.latitude,
    longitude: place.location.longitude
  };

  return (
    <Marker
      title={title}
      description={description}
      coordinate={coordinate}
    />
  );
}
