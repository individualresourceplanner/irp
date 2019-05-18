import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/state/reducer';
import AppNavigator from './src/AppNavigator';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from 'firebase';
import config from './config';
import ResourceRepo from './src/repositories/ResourceRepo';


const store = createStore(reducer)

class App extends React.Component{

    constructor(props){
        Firebase.initializeApp(config.firebase)
        ResourceRepo.createResource(
            EventFactory.createExample()
        )
        super(props)
    }

    render(){
        return (
            <Provider store={store}>
            <AppNavigator />
            </Provider>
        );
    }
}

export default App;
