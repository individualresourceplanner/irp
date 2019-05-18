import React from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';
import styles from './Map.scss';

const { PROVIDER_GOOGLE } = MapView;

const initialRegion = {
  latitude: 7.3697,
  longitude: 12.3547,
  latitudeDelta: 1.5,
  longitudeDelta: 0.75,
};

function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.Map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        showsPointsOfInterest
        showsCompass
        showsBuildings
        showsIndoors
        mapType="satellite"
        initialRegion={initialRegion}
      />
    </View>
  );
}

export default Map;
