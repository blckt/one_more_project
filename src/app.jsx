
import React from 'react';
import Provider from 'react-redux/lib/components/provider';
import Router from 'react-router/lib/Router';
import route from './routes'
import store from './utils/createStore';
import history from './utils/createHistory'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history} routes={route} />
            </Provider>
        )
    }
}
