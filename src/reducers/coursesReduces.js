import { START_FETCHING_COURSES, DASHBOARD_COURSE_LOAD } from '../constants/coursesConstants';

const courses = {
    isFetching: false,
    courses: [],
    course: {}
}

const coursesReducer = (state = courses, action) => {
    switch (action.type) {
        case START_FETCHING_COURSES: {
            return Object.assign({}, courses, action.courses);
        }
        case DASHBOARD_COURSE_LOAD: {
            return Object.assign({}, state, { course: action.course });
        }
        default: return state;
    }
}

export default coursesReducer;
