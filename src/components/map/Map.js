import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { MapView, Icon } from 'expo';
import ResourceMarker from './ResourceMarker';
import { setLocation, setResources, setAggregations } from '../../state/actionCreators';
import { listenResources, listenAggregations } from '../../data/firebase';
import styles from './Map.scss';

const { PROVIDER_GOOGLE } = MapView;

const initialRegion = {
  latitude: 7.3697,
  longitude: 12.3547,
  latitudeDelta: 1.5,
  longitudeDelta: 0.75,
};

class Map extends Component {

  state = {
    selectedMarkers:new Set(),
  }


  componentDidMount() {
    // listen to changes to the resources collection
    listenResources((resources) => {
      this.props.setResources(resources);
    });
    listenAggregations((aggregations) => {
      this.props.setAggregations(aggregations);
    });
  }

  onLocationChange = (element) => {
    const { latitude, longitude } = element.nativeEvent.coordinate;
    const location = {
      latitude: latitude.toFixed(2),
      longitude: longitude.toFixed(2),
    };
    if (location !== this.props.location) {
      this.props.setLocation(location);
    }
  };

  addSelectedMarker = (id)=>{
    let { selectedMarkers } = this.state
    this.setState({selectedMarkers : selectedMarkers.add(id)})
  }

  removeSelectedMarker = (id)=>{
    let { selectedMarkers } = this.state
    this.setState({selectedMarkers : selectedMarkers.delete(id) ? selectedMarkers: selectedMarkers})
  }

  renderResources = () => {
    const { resources, aggregations } = this.props;
    const { selectedMarkers } = this.state;
    if (resources.length > 0) {
      return resources.map((resource) => {
        let memberInAggregations = []
        aggregations.forEach((a)=>{
          memberInAggregations.push(a.members)
          })
        return <ResourceMarker
          key={resource.id}
          resource={resource}
          selectedMarkers={selectedMarkers}
          isSelected={selectedMarkers.has(resource.id)}
          addToSelected={this.addSelectedMarker}
          removeFromSelected={this.removeSelectedMarker}
          aggregations={memberInAggregations} />;
      });
    }
    return null;
  };


  render() {
    console.log("Redraw!")
    console.log(this.state.selectedMarkers)
    return (
      <View style={styles.container}>
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
  addAggregations: (aggregations) => { dispatch(addAggregations(aggregations)); },
  setAggregations: (aggregations) => { dispatch(setAggregations(aggregations)); },
});

function mapStateToProps(state) {
  return {
    location: state.location,
    resources: state.resources,
    aggregations: state.aggregations,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
