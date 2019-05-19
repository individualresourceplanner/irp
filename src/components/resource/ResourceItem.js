import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  Picker,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { setResources } from '../../state/actionCreators';
import { addResource } from '../../data/firebase';
import FormInput from './FormInput';
import styles from './ResourceItem.scss';

/*

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

*/

const colors = [
  {
    name: 'casual',
    color: '#DCE775',
  },
  {
    name: 'important',
    color: '#FCB900',
  },
  {
    name: 'urgent',
    color: '#E91E63',
  },
];

class ResourceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: [],
      description: '',
      location: '',
      priority: '0',
      image: null,
      currentTag: '',
      errorMessage: '',
    };

    this.openCamera = this.openCamera.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }

  onSubmit = () => {
    const {
      title,
      tags,
      description,
      location,
      priority,
      image,
    } = this.state;

    const newItem = {
      title,
      tags,
      description,
      location: {
        lat: 11,
        long: 11,
      },
      priority,
      image,
    };

    if (title === '') {
      this.setState({ errorMessage: 'Please enter a title' });
      return false;
    }

    addResource(newItem);
    this.props.navigation.navigate('Map');
  };

  handleTags = () => {
    const { currentTag, tags } = this.state;
    const newTags = tags.slice();
    if (currentTag !== ' ') {
      newTags.push(currentTag);
      this.setState({
        currentTag: '',
        tags: newTags,
      });
    }
  }

  deleteTag = (tag) => {
    const { tags } = this.state;
    const newTags = [];
    tags.forEach((element) => {
      if (element !== tag) {
        newTags.push(element);
      }
    });
    this.setState({
      tags: newTags,
    });
  }

  togglePriority = () => {
    this.setState(prevState => ({
      priority: (prevState.priority + 1) % colors.length,
    }));
  }

  async openCamera() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  render() {
    const {
      title,
      tags,
      description,
      location,
      priority,
      image,
      currentTag,
      errorMessage,
    } = this.state;

    const imageSource = image
      ? { uri: image }
      : require('../../assets/camera.png');

    return (
      <View style={styles.Outer}>
        <ScrollView contentContainerStyle={styles.Container}>
          <Text style={styles.Container__Title}>
            Report Demand
          </Text>
          {errorMessage !== '' && (
            <Text style={styles.Container__Error}>
              {errorMessage}
            </Text>
          )}
          <FormInput
            placeholder={'Title'}
            title={title}
            onChange={(text) => { this.setState({ errorMessage: '', title: text }); }}
            Icon={'text'}
            style={styles.Container__Item}
          />
          <View style={styles.Container__Row}>
            <TouchableOpacity
              style={styles.Container__Image}
              onPress={this.openCamera}
            >
              <Image source={imageSource} style={styles.Container__Image__Item} />
            </TouchableOpacity>
            {image && (
              <TouchableOpacity
                style={styles.Container__Image__Delete}
                onPress={() => this.setState({ image: null })}
              >
                <Text style={styles.Container__Image__Delete__Text}>X</Text>
              </TouchableOpacity>
            )}
            <View style={styles.Container__Row__Col}>
              <FormInput
                placeholder={'Location'}
                title={location}
                onChange={(text) => { this.setState({ location: text }); }}
                Icon={'location'}
                style={[styles.Container__Row__Col__Item, { marginBottom: 10 }]}
              />
              <TouchableOpacity
                onPress={this.togglePriority}
                style={[styles.Container__Row__Col__Priority, { backgroundColor: colors[priority].color }]}
              >
                <Icon
                  style={styles.Container__Row__Col__Priority__Icon}
                  name="warning"
                  size={22}
                />
                <Text style={styles.Container__Row__Col__Priority__Text}>
                  {colors[priority].name}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {tags.length > 0 && (
            <View style={styles.Container__TagContainer}>
              {tags.map(tag => (
                <TouchableOpacity
                  onPress={() => { this.deleteTag(tag); }}
                  style={styles.Container__TagContainer__Tags}
                >
                  <Text
                    style={styles.Container__TagContainer__Tags__Text}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <FormInput
            placeholder={'Tags'}
            title={currentTag}
            onChange={(text) => { this.setState({ currentTag: text }); }}
            Icon={'tag'}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === ' ') {
                this.handleTags();
              }
            }}
            style={styles.Container__Item}
          />
          <TextInput
            multiline
            numberOfLines={3}
            textAlignVertical={'top'}
            value={description}
            onChangeText={text => this.setState({ description: text })}
            style={styles.Container__InputBox}
            placeholder={'Description'}
          />
          <Button
            title="Publish"
            buttonStyle={styles.Container__PublishButton}
            onPress={this.onSubmit}
          />
        </ScrollView>
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
