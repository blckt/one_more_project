import { START_FETCHING_COURSES } from '../constants/coursesConstants'
const fb = require('../utils/initFireBase.js');
console.log(fb);
export const getCoursesList = (courses) => {
    return dispatch => {
        dispatch({
            type: START_FETCHING_COURSES,
            courses: {
                isFetching: true
            }
        });
        fb.loadCourses()
            .then(courses => {
                console.log(courses)
                // dispatch(coursesLoaded(courses));
            })
    }
};


export const coursesLoaded = (courses) => {
    let coursesArray = [];
    Object.keys(courses)
        .forEach(key => coursesArray.push(Object.assign({}, courses[key], { key })));

    return dispatch => {
        dispatch({
            type: START_FETCHING_COURSES,
            courses: {
                isFetching: false,
                courses: coursesArray
            }
        })
    }
};