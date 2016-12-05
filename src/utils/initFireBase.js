const Guid = require('guid');
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
var equal = require('deep-equal');
import store from '../utils/createStore';
import * as storageActions from '../actions/storageActions';
import { login, logout, profileDataChanges } from '../actions/usersActions';


var config = {
    apiKey: "AIzaSyAdkIgIi5vcbsvRhQ21WID9LA9KYUzKe9U",
    authDomain: "western-stone-146220.firebaseapp.com",
    databaseURL: "https://western-stone-146220.firebaseio.com",
    storageBucket: "western-stone-146220.appspot.com",
    messagingSenderId: "72550096492"
};

firebase.initializeApp(config)

class FireBase {
    constructor() {
        this.initFirebase();
    }
    initFirebase() {
        this.auth = firebase.auth();
        this.database = firebase.database();
        this.storage = firebase.storage();
        this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
        this.rootStorage = this.storage.ref();
    }

    onAuthStateChanged(user) {
        store.dispatch(profileDataChanges(user));
    }
    loadCourses() {
        return new Promise((resolve, reject) => {
            this.coursesRef = this.database.ref('courses');
            this.coursesRef.off();
            this.coursesRef.on('value', (data) => {
                resolve(data.val())
            })
        })
    }
    addCourse(course, existGuid) {
        var guid = existGuid || Guid.create();
        return new Promise((resolve, reject) => {
            this.database.ref('courses/' + guid)
                .set(course);
            resolve();
        })
    }
    getCourse(id) {
        return new Promise((resolve, reject) => {
            var courseRef = firebase.database().ref('courses/' + id);
            courseRef.on('value', function (snapshot) {
                resolve(Object.assign({}, snapshot.val(), { key: "" + id }));
            });
        })
    }
    addLectureToCourse(courseId, lect) {
        return this.getCourse(courseId)
            .then(course => {
                delete course.key;
                course.lectures = course.lectures || [];
                course.lectures.push(lect);
                return this.addCourse(course, courseId)
            })
    }
    addTask(task) {
        var guid = Guid.create();
        return new Promise((resolve, reject) => {
            this.database.ref('tasks/' + guid)
                .set(task);
            resolve();
        })
    }
    addLecture(lecture) {
        var guid = Guid.create();
        return new Promise((resolve, reject) => {
            this.storageAddFile(lecture.file)
                .then(url => {
                    var lect = {};
                    lect[guid] = true;
                    lecture.file = url;
                    lecture.tasks = lecture.selectedTasks.map(task => {
                        var tsk = {};
                        tsk[task.key] = true;
                        return tsk;
                    });
                    lecture.tasks.forEach(task => {
                        Object.keys(task)
                            .forEach(key => {
                                this.addLectureToTask(lect, key)
                            })
                    });
                    this.addLectureToCourse(lecture.courseKey, lect)
                    delete lecture.selectedTasks;
                    this.database.ref('lectures/' + guid)
                        .set(lecture);
                    resolve();
                })
        })
    }
    addLectureToTask(lecture, key) {
        return new Promise((resolve, reject) => {
            var ref = firebase.database().ref('tasks/' + key);
            ref.on('value', function (snapshot) {
                var task = snapshot.val();
                task.lectures = task.lectures || [];
                var hasLection = task.lectures.some(lect => equal(lect, lecture))
                if (!hasLection) {
                    task.lectures.push(lecture);
                    ref.set(task);
                }
                resolve();
            });
        })
    }
    getTask(id) {
        return new Promise((resolve, reject) => {
            var ref = firebase.database().ref('tasks/' + id);
            ref.on('value', function (snapshot) {
                resolve(Object.assign({}, snapshot.val(), { key: "" + id }));
            });
        })
    }
    getTasks() {
        return new Promise((resolve, reject) => {
            var ref = firebase.database().ref('tasks');
            ref.on('value', function (tasks) {
                var values = Object.keys(tasks.val()).map(key => {
                    var x = tasks.val()[key];
                    return Object.assign({}, { key }, x);
                })
                resolve(values);
            })
        })
    }
    storageAddFile(file, metadata) {
        var guid = Guid.create();
        return new Promise((resolve, reject) => {
            var uploadTask = this.rootStorage.child('docs/' + guid).put(file, metadata);
            uploadTask.on('state_changed', (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                store.dispatch(storageActions.onProgress(progress))
            }, function (error) {
                // Handle unsuccessful uploads
                console.log(error)
            }, () => {
                resolve(uploadTask.snapshot.downloadURL);
                store.dispatch(storageActions.uploadFinished(uploadTask.snapshot.downloadURL))
            })
        })
    }
    storageGetFile(path) {
        return new Promise((resolve, reject) => {

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