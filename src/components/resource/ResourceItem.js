import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { setResources } from '../../state/actionCreators';
import { addResource } from '../../data/firebase';
import styles from './ResourceItem.scss';


class ResourceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit = () => {
    const resource = {
      id: '1',
      title: 'Apples',
      tags: ['food', 'fruit', 'fresh'],
      description: 'yum 😋',
      price: {
        value: '1€',
        unit: 'kg'
      },
      stock: {
        value: 100,
        unit: 'kg'
      },
      place: {
        id: '1',
        name: 'Musterstr. 12',
        address: 'Musterstr. 12, 12345 Berlin, Deutschland',
        location: {
          latitude: 52.3918567,
          longitude: 13.1239394
        },
      }
    };
    addResource(resource).then(() => {
      console.log('Added new resource: ', resource);
      this.props.resources.push(resource);
      this.props.setResources(this.props.resources);
    }).catch((e) => {
      console.warn('ERROR Adding new resource: ', e);
    });

    this.props.navigation.navigate('Map');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.Button, { bottom: 30, right: 30 }]}
          onPress={this.onSubmit}
        >
          <Text
            style={styles.Button__text}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setResources: (resources) => { dispatch(setResources(resources)); },
});

function mapStateToProps(state) {
  return {
    resources: state.resources,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem);
