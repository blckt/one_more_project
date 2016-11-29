import requireAuth from '../../utils/requireAuth.js';
import Course from './components/Course.jsx';
module.exports = {
    path: '/course/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/'))
        })
    },
    childRoutes:[Course],
    onEnter: requireAuth,
}