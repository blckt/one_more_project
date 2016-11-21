const Guid = require('guid');
var firebase = require('firebase/app');
// all 3 are optional and you only need to require them at the start
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import store from '../utils/createStore';
// import constancts from '../constants/userContants';
import { login, logout, profileDataChanges } from '../actions/usersActions';
// import { courseLoaded } from '../actions/courseActions';
// import { coursesLoaded } from '../actions/actions'
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
        return new Promise((resolve, reject) => {
            this.coursesRef = this.database.ref('courses');
            // Make sure we remove all previous listeners.
            this.coursesRef.off();
            this.coursesRef.on('value', (data) => {
                //store.dispatch(coursesLoaded())
                resolve(data.val())
            })
        })
    }
    addCourse(course) {
        var guid = Guid.create();
        this.database.ref('courses/' + guid)
            .set(course);
        return guid;
    }
    getCourse(id) {
        return new Promise((resolve, reject) => {
            var courseRef = firebase.database().ref('courses/' + id);
            courseRef.on('value', function (snapshot) {
                resolve(Object.assign({}, snapshot.val(), { key: "" + id }));
            });
        })
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
module.exports.fb = fb;
module.exports.FireBase = FireBase;