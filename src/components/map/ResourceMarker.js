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
        backgroundColor: resource === 0 ? "green" : resource === 1 ? "yellow" : resource === 2 ? "red" : "black",
        padding: 10,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
      }}>
        <Text style={{
          color: 'white',
          fontSize: 15,
        }}>{title}</Text>
      </View>
      <MapView.Callout>
        <View style={{
          padding: 3,
          minWidth: 200,
        }}>
          <Text style={{
            color: 'darkgrey',
            fontSize: 15,
          }}>
            {title}{'\n'}
          </Text>
          <Text style={{
            color: 'darkgrey',
            fontSize: 13,
          }}>
            Amount: {stock.value} {stock.unit} {'\n'}
            Details: {description}{'\n'}
          </Text>
        </View>
      </MapView.Callout>
    </Marker>
  );

}
