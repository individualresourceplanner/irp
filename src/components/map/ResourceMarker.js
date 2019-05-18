import React from 'react';
import { MapView } from 'expo';
// import styles from './ResourceMarker.scss';
import { View, Button, Text, StyleSheet} from 'react-native';

const { Marker } = MapView;

export default function ResourceMarker(props) {
  const { resource } = props;
  const { title, description, place, stock } = resource;

  const coordinate = {
    latitude: place.location.latitude,
    longitude: place.location.longitude
  };

  const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  return (
    <Marker
    coordinate={coordinate}
    onCalloutPress={() => alert('Clicked')}
    >
    <View style={{backgroundColor: "red", padding: 10}}>
    <Text>{title}</Text>
    </View>
    <MapView.Callout >
    <View style={{backgroundColor: "white", padding: 3, minWidth: 200}}>
    <Text style={styles.titleText}>
    {title}{'\n'}
    </Text>
    <Text>
    Amount: {stock.value} {stock.unit} {'\n'}
    Details: {description}
    </Text>
    <Button title='Aggregate' onPress={() => console.log('Clicked')} />
    </View>
    </MapView.Callout>
    </Marker>
  );

}
