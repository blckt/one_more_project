import requireAuth from '../../utils/requireAuth.js';
import Course from './components/Course.jsx';
import LecturePage from './components/LectureComponents/LectureProgressPage'
module.exports = {
    path: '/course/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/'))
        })
    },
    childRoutes:[Course,LecturePage],
    onEnter: requireAuth,
}