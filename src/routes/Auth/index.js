const store = require('../../utils/createStore').default;
module.exports = {
    path: '/auth',
    getComponent(nextState, cb) {
        require.ensure([], (require) => cb(null, require('./AuthPage')));
    },
    onEnter(nextState, replaceState) {
        const user = store.getState().user;
        if (user) {
            replaceState({ nextPathname: nextState.location.pathname, pathname: '/' });
        }
    }
}