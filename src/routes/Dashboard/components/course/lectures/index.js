module.exports = 
    {
        path: '/dashboard/course/:id/addLecture',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('./lectures.jsx'), "lectures");
            })
        }
    }

