import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StatusBar} from 'react-native';
import { MapView, Icon } from 'expo';
import ResourceMarker from './ResourceMarker';
import { setLocation, setResources, setAggregations } from '../../state/actionCreators';
import { listenResources, listenAggregations } from '../../data/firebase';
import styles from './Map.scss';
import FilterBar from './FilterBar';


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
    filter: '',
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
    filteredResources = this.filteredResources()
    console.log(filteredResources)
    const { selectedMarkers } = this.state;
    return filteredResources.map((resource) => {
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

  onUpdateFilter = (value) => {
    this.setState({ filter: value });
  }

  filteredResources = () => {
    const { filter} = this.state;
    const { resources} = this.props;
    if (filter === '') {
      return resources;
    }

    // strings to filter for (lowercase)
    const filterStrings = filter.toLowerCase().split(' ')
      .filter(filterString => filterString !== '');

    // filter resources
    return resources.filter((resource) => {
      // create string from tags
      const tagsString = resource.tags.join(' ').toLowerCase();

      // include resources if all filterStrings are included in tags
      return filterStrings.every((filterString) => {
        return tagsString.includes(filterString);
      });
    });
  }

  render() {
    const { filter } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <TouchableOpacity 
        style={[styles.Button, { bottom: 30, right: 30 }]}
        onPress={() => this.props.navigation.navigate('Resource')}>
        <Text style={styles.Button__text} > + </Text>
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

        <FilterBar value={filter} onUpdate={this.onUpdateFilter} />
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

const mapStateToProps = state => {
  return {
    location: state.location,
    resources: state.resources,
    aggregations: state.aggregations,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
