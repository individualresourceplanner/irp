import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../../firebase.config';

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const aggregationsCollectionName = 'Aggregations'

export function addResource(resource) {
  console.log('adding resource: ', resource);
  return database.collection('Resources').add(resource);
}

export function listenResources(callback) {
  database.collection('Resources').onSnapshot((querySnapshot) => {
    console.log('resources updated.');
    const resources = [];
    querySnapshot.forEach((doc) => {
      const resource = doc.data();
      resource.id = doc.id;

      if (validateResource(resource)) {
        resources.push(resource);
      } else {
        console.warn('invalid resource: ', resource);
      }
    });
    callback(resources);
  });
}

export function addAggregations(aggregation) {
  console.log('adding Aggregation: ', resource);
  return database.collection('Aggregations').add(resource);
}

export function listenAggregations(callback) {
  database.collection('Aggregations').onSnapshot((querySnapshot) => {
    console.log('aggregations updated.');
    const resources = [];
    querySnapshot.forEach((doc) => {
      const resource = doc.data();
      resource.id = doc.id;
      resources.push(resource);
    });
    callback(resources);
  });
}

function validateResource(resource) {
  if (!resource.title) return false;
  if (!resource.location) return false;
  return true;
}
