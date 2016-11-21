module.exports = {
    path: '/dashboard/course/create',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./course.jsx'), "dashboard")
        })
    }
}