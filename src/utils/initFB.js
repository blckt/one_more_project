var firebase = require('firebase/app');
var config = {
    apiKey: "AIzaSyAdkIgIi5vcbsvRhQ21WID9LA9KYUzKe9U",
    authDomain: "western-stone-146220.firebaseapp.com",
    databaseURL: "https://western-stone-146220.firebaseio.com",
    storageBucket: "western-stone-146220.appspot.com",
    messagingSenderId: "72550096492"
};

var app = firebase.initializeApp(config)

module.exports = app;