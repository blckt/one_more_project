import Main from './Main';
import AuthPage from './Auth';
import App from '../containers/App';
import Dashboard from './Dashboard'
import Course from './Dashboard/components/course/index.jsx';

export default {
    path: '/',
    component: App,
    childRoutes: [Main, AuthPage, Dashboard]
}