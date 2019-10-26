const firebase = require("./firebase");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDj9RxI4FMn2sNGNFoih4CJHqp0p9e6lH4",
  authDomain: "dice-race-84a07.firebaseapp.com",
  projectId: "dice-race-84a07"
});

const db = firebase.firestore();

module.exports = db;
