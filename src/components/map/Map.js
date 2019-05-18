import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';
import styles from './Map.scss';
import ResourceMarker from './ResourceMarker';

const { PROVIDER_GOOGLE } = MapView;

const initialRegion = {
  latitude: 7.3697,
  longitude: 12.3547,
  latitudeDelta: 1.5,
  longitudeDelta: 0.75,
};

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: [
        {
          id: '1',
          title: 'Apples',
          tags: ['food', 'fruit', 'fresh'],
          description: 'yum 😋',
          price: {
            amount: 1,
            currency: 'EUR',
            quantity: {
              amount: 1,
              unit: 'kg'
            }
          },
          quantity: {
            amount: 100,
            unit: 'kg'
          },
          place: {
            id: '1',
            name: 'Musterstr. 12',
            address: 'Musterstr. 12, 12345 Berlin, Deutschland',
            location: {
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude
            },
          }
        }
      ]
    };
  }

  renderResources = () => {
    const { resources } = this.state;
    return resources.map((resource, i) => {
      return <ResourceMarker key={resource.id} resource={resource} />;
    });
  };

  render() {
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
          ref={(mapView) => { this.mapView = mapView; }}
        >
          {this.renderResources()}
        </MapView>
      </View>
    );
  }
}
