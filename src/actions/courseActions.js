const fb = require('../utils/initFireBase');
const lecturesManager = require('../utils/FBLectures');
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

export const addLecture = (lecture) => {
    return dispatch => {
        fb.addLecture(lecture)
            .then(() => {
                history.goBack();
            })
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

export const getCourseLectures = (lectures) => {
    return dispatch => {
        dispatch({
            type: 'COURSE_LECTURES_LOAD',
            fetching: true
        });
        lecturesManager.getLectures(lectures)
            .then(lectures => dispatch({
                type: 'COURSE_LECTURES_LOAD',
                payload: {
                    fetching: false,
                    lectures
                }
            }))
    }
}