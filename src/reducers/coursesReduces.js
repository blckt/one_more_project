import * as courseContants from '../constants/coursesConstants';
import *  as tasksConsts from '../constants/tasksConstants';

const courses = {
    isFetching: false,
    courses: [],
    course: {},
    task: {},
    tasks: [],
    lectures: {
        fetching:false,
        lectures:[]
    }
}

const coursesReducer = (state = courses, action) => {
    switch (action.type) {
        case courseContants.START_FETCHING_COURSES: {            
            return Object.assign({}, state, action.courses);
        }
        case courseContants.DASHBOARD_COURSE_LOAD: {
            const newstate = Object.assign({}, state, { course: action.course });
            return newstate;
        }
        case tasksConsts.GET_TASK: {
            return Object.assign({}, state, { task: action.task });
        }
        case tasksConsts.GET_TASKS: {
            return Object.assign({}, state, { tasks: action.tasks });
        }
        case courseContants.COURSE_LECTURES_LOAD: {
            return Object.assign({}, state, { lectures: action.payload });
        }
        default: return state;
    }
}

export default coursesReducer;
