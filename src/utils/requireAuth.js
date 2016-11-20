import store from './createStore';
import { pingAuth } from '../actions/usersActions';
export default function (nextState, replaceState) {
    const state = store.getState();
    if (state.user === null) {
        replaceState({ nextPathname: nextState.location.pathname, pathname: '/auth' });
    }
}