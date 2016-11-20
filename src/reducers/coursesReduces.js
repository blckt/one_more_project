import { START_FETCHING_COURSES } from '../constants/coursesConstants';

const courses = {
    isFetching: false,
    courses: []
}

const coursesConstants = (state = courses, action) => {
    switch (action.type) {
        case START_FETCHING_COURSES: {
            return Object.assign({}, courses, action.courses);
        }
        default: return state;
    }
}

export default userReducer;
