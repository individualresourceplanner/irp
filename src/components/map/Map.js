import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { setLocation } from '../../state/actionCreators';
import styles from './Map.scss';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    const location = await Location.getCurrentPositionAsync({});
    this.props.setLocation(location);
  };

  render() {
    const { location } = this.props;
    console.log(location);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.Button}
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
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  setLocation: (location) => { dispatch(setLocation(location)); },
});

function mapStateToProps(state) {
  return {
    location: state.location,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
