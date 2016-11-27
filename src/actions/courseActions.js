const fb = require('../utils/initFireBase');
import history from '../utils/createHistory';

export const addCourse = (course) => {
    return dispatch => {
        history.push("/dashboard");
        fb.addCourse(course).then(data => console.log(data));
        dispatch({
            type: "ADD_COURSE"
        });
    }
}

export const getCourse = (id) => {
    return dispatch => {
        dispatch({
            type: 'DASHBOARD_COURSE_LOAD',
            course: {
                isFetching: true
            }
        })
        fb.getCourse(id)
            .then(data => {
                dispatch(courseLoaded(data));   
            });
    }

}

export const courseLoaded = (course) => {

    return {
        type: 'DASHBOARD_COURSE_LOAD',
        course: Object.assign({}, course, { isFetching: false })
    }
}