import { START_FETCHING_COURSES } from '../constants/coursesConstants'
const fb = require('../utils/initFireBase.js');
console.log(fb);
export const getCoursesList = (courses) => {
    return dispatch => {
       fb.loadCourses();
        dispatch({
            type: START_FETCHING_COURSES,
            courses: {
                isFetching: true
            }
        })
    }
};

export const coursesLoaded = (courses) => {
   let coursesArray =[];
    Object.keys(courses)
    .forEach(key=>coursesArray.push(courses[key]));
 
    return dispatch => {
        dispatch({
            type: START_FETCHING_COURSES,
            courses: {
                isFetching: false,
                courses:coursesArray
            }
        })
    }
};