import React, { Component } from 'react';
import { MenuItem, IconMenu, FlatButton } from 'material-ui';

class Login extends Component {
    render() {
        return (
            <FlatButton {...this.props} label="Login" />
        );
    }
}

export default Login;