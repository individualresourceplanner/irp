import Firebase from 'firebase';

export function writeResourceData() {
  Firebase.database().ref('/').set(this.state);
  console.log('DATA SAVED');
}

export function getResourceData() {
  const ref = Firebase.database().ref('/');
  ref.on('value', (snapshot) => {
    const state = snapshot.val();
    this.setState(state);
  });
  console.log('DATA RETRIEVED');
}
