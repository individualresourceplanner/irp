import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { MapView } from 'expo';
import { setLocation } from '../../state/actionCreators';
import styles from './Map.scss';
import ResourceMarker from './ResourceMarker';


const { PROVIDER_GOOGLE } = MapView;

const initialRegion = {
    latitude: 7.3697,
    longitude: 12.3547,
    latitudeDelta: 1.5,
    longitudeDelta: 0.75,
};

class Map extends Component {
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

    componentDidMount(){
        console.log(this.props.resources)
    }

    onLocationChange = (element) => {
        const { latitude, longitude } = element.nativeEvent.coordinate;
        this.props.setLocation({
            latitude,
            longitude,
        });
    };

    renderResources = () => {
        const { resources } = this.state;
        return resources.map((resource) => {
            return <ResourceMarker key={resource.id} resource={resource} />;
        });
    };

    render() {
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
});

function mapStateToProps(state) {
    return {
        location: state.location,
        resources: state.resources,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
