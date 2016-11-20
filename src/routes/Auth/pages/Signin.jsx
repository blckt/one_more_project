import React, { PropTypes } from 'react';
import Form from '../components/Form';
import { Paper, RaisedButton } from 'material-ui';
import fb from '../../../utils/initFireBase.js';
import { login } from '../../../actions/usersActions.js'
import store from '../../../utils/createStore.js';
const styles = {
    paperStyle: {
        width: '500px',
        margin: 'auto',
        padding: '20px'
    }
}
const setProp = (propName) => {
    if (/password/.test(propName.toLowerCase())) {
        return 'password';
    }
    if (/email/.test(propName.toLowerCase())) {
        return 'email'
    }
    return 'text';
}

class SignIn extends React.Component {
    constructor(props) {
        super(props);
    }
    handleLogin(user) {
        store.dispatch(login(user.Email, user.Password))
        // fb.signIn(user.Email, user.Password);
    }
    handleGoogleLogin() {
        fb.signInGoogle();
    }

    render() {

        const vals = Object.keys(this.props.user).map(key => ({
            propName: key,
            propType: setProp(key),
            isRequired: true
        }));
        return (<div>
            <Paper style={styles.paperStyle} zDepth={3}>
                <Form values={vals} handleSubmit={this.handleLogin.bind(this)} />
                <RaisedButton onClick={this.handleGoogleLogin}>Sign in with Google </RaisedButton>
            </Paper>
        </div>)
    }
}

SignIn.propTypes = {
    user: PropTypes.shape({
        Email: PropTypes.any,
        Password: PropTypes.any
    }).isRequired,
    handleLogin: PropTypes.func.isRequired
}
module.exports = SignIn;