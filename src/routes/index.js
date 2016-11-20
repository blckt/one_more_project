import Main from './Main';
import AuthPage from './Auth';
import App from '../containers/App';

export default {
    path: '/',
    component: App,
    childRoutes: [Main, AuthPage]
}