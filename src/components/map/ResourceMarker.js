import React from 'react';
import { MapView } from 'expo';
// import styles from './ResourceMarker.scss';
import { View, Button, Text, StyleSheet} from 'react-native';

const { Marker } = MapView;

export default function ResourceMarker(props) {
  const { 
    resource, aggregations, removeFromSelected,
    addToSelected, selectedMarkers, isSelected
  } = props;
  const { title, description, location, stock } = resource;


  const coordinate = {
    latitude: location.latitude,
    longitude: location.longitude
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

  toggleSelected = ()=> {
    if (isSelected){
      removeFromSelected(resource.id)
    }else{
      addToSelected(resource.id)
    }
  }

  return (
    <Marker
      coordinate={coordinate}
      onPress= {()=> this.toggleSelected() }
    >
    <View style={
      {
        backgroundColor: "red", 
          padding: 10
      }}>
        <Text>{title}</Text>
      </View>
      <MapView.Callout >
        <View style={{backgroundColor: "white", padding: 3, minWidth: 200}}>
          <Text style={styles.titleText}>
            {title}{'\n'}
          </Text>
          <Text>
            Details: {description}{'\n'}
          </Text>
        </View>
      </MapView.Callout>
    </Marker>
  );

}
