import requireAuth from '../../utils/requireAuth.js';
const course = require('./components/course')

const AllCourses = require('./components/course/allCourses.jsx')
module.exports = {
    path: '/dashboard',

    indexRoute: {
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('./components/course/allCourses.jsx'))
            }, "dashboard")
        },
    },
    childRoutes: course,
    onEnter: requireAuth
}