import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALc8APTC_9y0AQONUItz7xgdNW3URjW1w",
  authDomain: "airtask-database.firebaseapp.com",
  projectId: "airtask-database",
  storageBucket: "airtask-database.appspot.com",
  messagingSenderId: "1004650440572",
  appId: "1:1004650440572:web:4ecef060b1fde98af066f9",
};

firebase.initializeApp(firebaseConfig);

const firestore_ = firebase.firestore();
const auth_ = firebase.auth();

const timestamp_ = firebase.firestore.Timestamp;

export { firestore_, auth_, timestamp_ };
