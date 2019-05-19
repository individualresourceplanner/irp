import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView, Location, Permissions } from 'expo';
import styles from './LocationPicker.scss';

const { PROVIDER_GOOGLE, Marker } = MapView;

export default class LocationPicker extends Component {
  state = {
    coordinate: {
      latitude: 11,
      longitude: 49
    }
  }

  componentDidMount() {
    this.getLocationAsync().then((location) => {
      this.setState({
        coordinate: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
    });
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.warn('Warning: Did not grant location premissions.');
    }

    return Location.getCurrentPositionAsync({});
  };

  onDragEnd = (e) => {
    const { coordinate } = e.nativeEvent;
    this.setState({ coordinate });
    // console.log('onDragEnd: ', coordinate);
  }

  pressSelect = () => {
    const { coordinate } = this.state;
    console.log('selected location: ', coordinate);
    const { callback } = this.props;
    callback(coordinate);
  }

  render() {
    const { coordinate } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Please pick a location:</Text>
        </View>

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
          ref={(mapView) => { this.mapView = mapView; }}
        >
          <Marker
            draggable
            coordinate={coordinate}
            onDragEnd={this.onDragEnd}
          />
        </MapView>

        <Button
          title="Select"
          onPress={this.pressSelect}
        />
      </View>
    );
  }
}
