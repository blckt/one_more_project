import { START_FETCHING_COURSES, DASHBOARD_COURSE_LOAD } from '../constants/coursesConstants';
import *  as tasksConsts  from '../constants/tasksConstants';

const courses = {
    isFetching: false,
    courses: [],
    course: {},
    task: {}
}

const coursesReducer = (state = courses, action) => {
    switch (action.type) {
        case START_FETCHING_COURSES: {
            console.log(action)
            return Object.assign({}, state, action.courses);
        }
        case DASHBOARD_COURSE_LOAD: {
            const newstate = Object.assign({}, state, { course: action.course });
            return newstate;
        }
        case tasksConsts.GET_TASK: {
            console.log(action)
            return Object.assign({}, state, { task: action.task })
        }
        default: return state;
    }
}

export default coursesReducer;
