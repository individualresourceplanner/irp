/*
import React from 'react';
import Firebase from 'firebase';
import config from '../../config';


class ResourceRepo extends React.Component {

    state = {
        resources: []
    }

    componentDidMount() {
        this.getResourceData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.writeResourceData();
        }
    }

    createResource = (resources) =>{
        resources_list = this.state.resources
        this.setState({
            resources : resources_list.push(1)
        })
    }

    writeResourceData = () => {
        Firebase.database().ref('/').set(this.state);
        console.log('DATA SAVED');
    }

    getResourceData = () => {
        let ref = Firebase.database().ref('/');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
        console.log('DATA RETRIEVED');
    }
}
*/
