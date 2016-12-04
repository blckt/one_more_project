import LectureProgressPage from './LectureProgressPage';
//import requireAuth from 'util/requireAuth.js';
module.exports = {
    path: 'lecture/:id',
    getComponent(nextState, cb) {
        require.ensure([], () => {
            cb(null,require('./LectureProgressPage').default);
            console.log('here')
        })
    },
  //  onEnter: requireAuth
}
