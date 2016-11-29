import combineReducers from 'redux/lib/combineReducers';
import coursesReduceers from './coursesReduces';
import userReducers from './userReducer';
import storageReducers from './storageReducers';

import { routerReducer as routing } from 'react-router-redux'

const App = combineReducers({
    routing,
    user: userReducers,
    courses: coursesReduceers,
    storage: storageReducers
});
export default App;
