import fb from '../utils/initFireBase';
import { START_FETCHING_COURSES } from '../constants/coursesConstants'
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
}