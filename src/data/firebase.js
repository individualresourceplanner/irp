import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../../firebase.config';

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export function writeResourceData(resources) {
  const file = database.collection('Resources').doc('A69bBAIDLL97R9f1MhwI');
  file.set({ resources });
}

export function getResourceData(callback) {
  const file = database.collection('Resources').doc('A69bBAIDLL97R9f1MhwI');
  file.get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No such document!');
      }
      callback(doc.data());
    })
    .catch((err) => {
      console.log('Error getting document', err);
    });
}
