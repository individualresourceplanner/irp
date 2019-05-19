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
  const { title, description, location, priority } = resource;

  function bgColor() {
    switch (priority) {
      case 0:
        return '#DCE775';
      case 1:
        return '#FCB900';
      case 2:
        return '#E91E63';
      default:
        return 'gray';
    }
  }


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
    <View
      style={{
        backgroundColor: bgColor(),
        padding: 10,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 1,
      }}
    >
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
            Details: {description}{'\n'}
          </Text>
        </View>
      </MapView.Callout>
    </Marker>
  );

}
