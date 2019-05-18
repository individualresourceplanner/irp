import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../../firebase.config';

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

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

function validateResource(resource) {
  if (!resource.title) return false;
  if (!resource.tags) return false;
  if (!resource.description) return false;
  if (!resource.place) return false;
  if (!resource.place.location) return false;

  return true;
}
