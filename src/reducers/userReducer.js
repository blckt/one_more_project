import { REGISTER, LOGOUT, AUTHENTICATE, PROFILE_DATA_UPDATED } from '../constants/userContants';

let user = JSON.parse(localStorage.getItem("firebase:authUser:AIzaSyAdkIgIi5vcbsvRhQ21WID9LA9KYUzKe9U:[DEFAULT]"));

const userReducer = (state = user, action) => {
    switch (action.type) {
        case REGISTER: {
            if (action.token) {
                return Object.assign({}, state, action.token);
            }
            break;
        }
        case PROFILE_DATA_UPDATED: {
            return Object.assign({}, action.user);
        }
        case AUTHENTICATE: {
            return Object.assign({}, action.user);
        }
        case LOGOUT: {
            return Object.assign({}, action.user);
        }
        default: return state;
    }
}

export default userReducer;
