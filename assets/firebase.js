import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwsKJ3t7JuwYtNaGvCmw7k27AiVQNSLtY",
    authDomain: "pedrapapeletesoura-online.firebaseapp.com",
    databaseURL: "https://pedrapapeletesoura-online.firebaseio.com",
    projectId: "pedrapapeletesoura-online",
    storageBucket: "pedrapapeletesoura-online.appspot.com",
    messagingSenderId: "669334779704",
    appId: "1:669334779704:web:0437116b619acf3f40b3cd",
    measurementId: "G-8LQ3Q2TY91",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth;
export default firebase;
