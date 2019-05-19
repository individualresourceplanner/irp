import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
} from 'react-native';
import { ImagePicker } from 'expo';
import styles from './Camera.scss';

export default class CameraView extends Component {
  state = {
    image: null,
  };

  async componentDidMount() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  render() {
    const { image } = this.state;

    return (
      <View style={styles.Camera}>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}
