import createStore from 'redux/lib/Createstore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import compose from 'redux/lib/compose';

import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
//import api from '../middleware/api'
import rootReducer from '../reducers'
//import DevTools from '../containers/DevTools'


const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk, createLogger()))
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
const store = configureStore();
export default store;