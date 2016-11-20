const Guid = require('guid');
var firebase = require('firebase/app');
// all 3 are optional and you only need to require them at the start
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import store from '../utils/createStore';
import constancts from '../constants/userContants';
import { login, logout, profileDataChanges } from '../actions/usersActions';
import { coursesLoaded } from '../actions/actions';
var config = {
    apiKey: "AIzaSyAdkIgIi5vcbsvRhQ21WID9LA9KYUzKe9U",
    authDomain: "western-stone-146220.firebaseapp.com",
    databaseURL: "https://western-stone-146220.firebaseio.com",
    storageBucket: "western-stone-146220.appspot.com",
    messagingSenderId: "72550096492"
};

class FireBase {
    constructor() {
        firebase.initializeApp(config)
        this.initFirebase();
    }
    initFirebase() {
        this.auth = firebase.auth();
        this.database = firebase.database();
        this.storage = firebase.storage();
        this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }

    onAuthStateChanged(user) {
        store.dispatch(profileDataChanges(user));
    }
    loadCourses() {
        this.coursesRef = this.database.ref('courses');
        // Make sure we remove all previous listeners.
        this.coursesRef.off();
        this.coursesRef.on('value', (data) => {
            
            store.dispatch(coursesLoaded(data.val()))
        })
    }
    addCourse(course) {

        this.database.ref('courses/' + Guid.create())
            .set(course);
    }
    signInGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider);
    }
    signIn(email, passowrd) {
        firebase.auth().signInWithEmailAndPassword(email, passowrd)
            .catch(err => {
                console.log(err);
            })
            .then(result => {
                //             console.log(result);
            })
    }
    signOut() {
        return this.auth.signOut();
    }
}

const fb = new FireBase()
module.exports = fb;
module.exports.fb=fb;
module.exports.FireBase = FireBase;