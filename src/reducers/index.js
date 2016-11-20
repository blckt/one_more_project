import combineReducers from 'redux/lib/combineReducers';
import userReducers from './userReducer';

import { routerReducer as routing } from 'react-router-redux'

const App = combineReducers({ routing, user: userReducers });
export default App;
