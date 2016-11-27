import requireAuth from '../../utils/requireAuth';
import './style.scss';

module.exports = {
  path: 'task/:id',
  onEnter:requireAuth,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ide'));
    });
  }
};
