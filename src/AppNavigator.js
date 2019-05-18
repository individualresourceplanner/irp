import { createAppContainer, createStackNavigator } from 'react-navigation';

import Map from './components/map/Map';
import ResourceItem from './components/resource/ResourceItem';

const AppNavigator = createStackNavigator({
  Map: {
    screen: Map,
  },
  Resource: {
    screen: ResourceItem,
  }
}, {
  initialRouteName: 'Map',
  defaultNavigationOptions: {
    header: null
  },
});

export default createAppContainer(AppNavigator);
