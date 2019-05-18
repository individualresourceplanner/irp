import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { setResources } from '../../state/actionCreators';
import writeResourceData from '../../data/firebase';
import styles from './ResourceItem.scss';

class ResourceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit = () => {
    const { resources } = this.props;
    this.props.setResources(resources);
    writeResourceData(resources);
  };

  render() {
    return (
      <View style={styles.container} />
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
