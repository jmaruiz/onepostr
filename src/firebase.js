import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCsKEODE-LvQk6OfvgVcfbvxjYJ9r9SWDw",
  authDomain: "reactr-63b99.firebaseapp.com",
  databaseURL: "https://reactr-63b99.firebaseio.com",
  projectId: "reactr-63b99",
  storageBucket: "reactr-63b99.appspot.com",
  messagingSenderId: "3200833960"
};
firebase.initializeApp(config);

export default firebase;
