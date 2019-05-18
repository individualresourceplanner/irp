import React from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';
import styles from './Map.scss';

function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.Map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

export default Map;
