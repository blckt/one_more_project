import requireAuth from '../../utils/requireAuth.js';

module.exports = {
    indexRoute: {
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('./components/'))
            })
        }
    },
    onEnter: requireAuth
}