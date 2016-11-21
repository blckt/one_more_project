import requireAuth from '../../utils/requireAuth.js';

module.exports = {
    path: '/dashboard',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/'))
        })
    },
    getChildRoutes(location,cb){
        cb(null,require('./components/course'))
    },
    onEnter: requireAuth
}