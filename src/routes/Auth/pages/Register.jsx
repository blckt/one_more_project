import React, { PropTypes } from 'react';
import { Paper } from 'material-ui';
import Form from '../components/Form';


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
class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    regSubmit(user) {
        console.log(user);
    }
    render() {
        const vals = Object.keys(this.props.user).map(key => ({
            propName: key,
            propType: setProp(key),
            isRequired: true
        }));
        return (<div>
            <Paper style={styles.paperStyle} zDepth={3}>
                <Form values={vals} handleSubmit={this.regSubmit.bind(this)} />
            </Paper>
        </div>)
    }
}

Register.propTypes = {
    user: PropTypes.shape({
        Email: PropTypes.any,
        UserName: PropTypes.any,
        Password: PropTypes.any,
        ConfirmPassword: PropTypes.any
    }).isRequired,
    submitAction: PropTypes.func.isRequired
}
module.exports = Register;
