import requireAuth from '../../utils/requireAuth.js';
const course = require('./components/course')
module.exports = {
    path: '/dashboard',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/'))
        }, "dashboard")
    },
    childRoutes: [course],
    onEnter: requireAuth
}