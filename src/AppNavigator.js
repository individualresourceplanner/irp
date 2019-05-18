import { createAppContainer, createStackNavigator } from 'react-navigation';

import Map from './components/map/Map';

const AppNavigator = createStackNavigator({
  Map: {
    screen: Map,
  },
}, {
  initialRouteName: 'Map',
  defaultNavigationOptions: {
    header: null
  },
});

export default createAppContainer(AppNavigator);
