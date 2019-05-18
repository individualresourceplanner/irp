import React from 'react';
import { Text, View } from 'react-native';
import styles from './Map.scss';
import { MapView } from 'expo';

function Map(props) {
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
