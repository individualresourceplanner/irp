import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './src/state/reducer';
import AppNavigator from './src/AppNavigator';

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  //console.group(action.type)
  //console.info('dispatching', action)
  let result = next(action)
  //console.log('next state', store.getState())
  //console.groupEnd(action.type)
  return result
}

let createStoreWithMiddleware = applyMiddleware(logger)(createStore)

let store = createStoreWithMiddleware(reducer)


function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
