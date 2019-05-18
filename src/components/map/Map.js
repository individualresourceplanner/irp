import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { MapView, Icon } from 'expo';
import ResourceMarker from './ResourceMarker';
import { setLocation, setResources } from '../../state/actionCreators';
import getResourceData from '../../data/firebase';
import styles from './Map.scss';

const { PROVIDER_GOOGLE } = MapView;

const initialRegion = {
  latitude: 7.3697,
  longitude: 12.3547,
  latitudeDelta: 1.5,
  longitudeDelta: 0.75,
};

class Map extends Component {
  onLocationChange = (element) => {
    const { latitude, longitude } = element.nativeEvent.coordinate;
    this.props.setLocation({
      latitude,
      longitude,
    });
  };

  onRefresh = () => {
    this.props.setResources(getResourceData());
  };

  renderResources = () => {
    return this.props.resources.map((resource) => {
      return <ResourceMarker key={resource.id} resource={resource} />;
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.Button, { bottom: 30, left: 30 }]}
          onPress={this.onRefresh}
        >
          <Icon.Ionicons
            name="refresh"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Button, { bottom: 30, right: 30 }]}
          onPress={() => this.props.navigation.navigate('Resource')}
        >
          <Text
            style={styles.Button__text}
          >
            +
          </Text>
        </TouchableOpacity>
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
          onUserLocationChange={this.onLocationChange}
          ref={(mapView) => { this.mapView = mapView; }}
        >
          {this.renderResources()}
        </MapView>
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  setLocation: (location) => { dispatch(setLocation(location)); },
  setResources: (resources) => { dispatch(setResources(resources)); },
});

function mapStateToProps(state) {
  return {
    location: state.location,
    resources: state.resources,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
