import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import apiKey from './api-key';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: apiKey,
    authDomain: "evernote-clone-2eb35.firebaseapp.com",
    databaseURL: "https://evernote-clone-2eb35.firebaseio.com",
    projectId: "evernote-clone-2eb35",
    storageBucket: "evernote-clone-2eb35.appspot.com",
    messagingSenderId: "21229928909",
    appId: "1:21229928909:web:8834804c895bf7c1594484",
    measurementId: "G-QQLKD4HZ5X"
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
