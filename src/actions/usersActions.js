const fb = require('../utils/initFireBase').fb;
import { AUTHENTICATE, PROFILE_DATA_UPDATED } from '../constants/userContants.js';
import { START_FETCHING_COURSES } from '../constants/coursesConstants';
import history from '../utils/createHistory';

export const register = (user) => {
    return { type: 'REGISTER', user }
};

export const login = (email, password) => {
    return dispatch => {
        fb.signIn(email, password)
    }
}

export const profileDataChanges = (data) => {
    return {
        type: PROFILE_DATA_UPDATED,
        user: data ? Object.assign({}, data.providerData[0], { token: data.refreshToken }) : null
    }
}

export const logout = () => {
    return dispatch => {
        fb.signOut().then(data => {
            dispatch({ type: 'LOGOUT', user: null })
        });
    }
};

export const getCoursesList = () => {
    return dispatch => {
        fb.loadCourses()
            .then(courses => {
                console.log(courses);
                dispatch(require('./actions').coursesLoaded(courses))
            })
        dispatch({
            type: START_FETCHING_COURSES,
            courses: {
                isFetching: true
            }
        })
    }
};

// export const coursesLoaded = (courses) => {
//     return dispatch => {
//         dispatch({
//             type: START_FETCHING_COURSES,
//             courses: {
//                 isFetching: false,
//                 courses
//             }
//         })
//     }
// };
export const pingAuth = () => ({ type: 'PING_AUTH' });
