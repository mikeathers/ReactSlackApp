import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var config = {
  apiKey: "AIzaSyCaQD3Trg2sfn9_w36aKt7R-ERrOR1q5R4",
  authDomain: "auth-76798.firebaseapp.com",
  databaseURL: "https://auth-76798.firebaseio.com",
  projectId: "auth-76798",
  storageBucket: "auth-76798.appspot.com",
  messagingSenderId: "775161942010"
};
firebase.initializeApp(config);

export default firebase;