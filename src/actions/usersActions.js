const fb = require('../utils/initFireBase');
import { AUTHENTICATE, PROFILE_DATA_UPDATED } from '../constants/userContants.js';
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

    data !== null ? history.push('/') : history.push('/auth');

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
export const pingAuth = () => ({ type: 'PING_AUTH' });
