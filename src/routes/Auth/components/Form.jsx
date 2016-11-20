import React, { PropTypes } from 'react';
import { TextField, RaisedButton } from 'material-ui';

class Form extends React.Component {
    constructor(props) {
        super(props);
        const errors = {};
        const values = {};
        props.values.forEach(item => {
            errors[item.propName] = ''; values[item.propName] = { value: '', type: item.propType, required: item.isRequired };
        });
        this.state = {
            errors, values, disabled: true
        }
    }
    onChange() {
        const name = arguments[0].target.name;
        const type = arguments[0].target.type;
        const value = arguments[0].target.value;
        const values = this.state.values;
        values[name].value = value;
        this.validateField(name, type, value);
        this.setState({ values })
        this.hasErrors();

    }
    hasErrors() {
        const {errors, values} = this.state;
        const hasEmptyRequriedValues = Object.keys(values).filter(item => item.isRequired).every(item => item.value);
        const shouldEnable = Object.keys(errors).every(item => !item) && hasEmptyRequriedValues;
        this.setState({ disabled: shouldEnable })
    }
    validateField(name, type, value) {
        const errors = this.state.errors;
        const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (type === 'email') {
            errors[name] = value.length > 0 && !emailReg.test(value) ? "Invalid email" : '';
        }

        if (type === 'password') {
            const values = this.state.values;
            if (name.toLowerCase() === 'confirmpassword') {
                const keys = Object.keys(values).filter(key => values[key].type === 'password');
                errors[name] = values[keys[0]].value === values[keys[1]].value ? '' : 'Passwords doesn`t match';
            } else {
                if (value.length > 0) {

                    errors[name] = value.length < 6 ? "Passwords must contain more than 6 symbols" :
                        '';
                    //          ! /[A-Z]/.test(value)
                    // ? "Passwords doesn`t match secure rules. Provide Upper case or digit symbol" :
                } else {
                    errors[name] = ''
                }
            }
        }
        this.setState({ errors });
    }
    submitForm() {
        const mappedObject = {};
        const {values} = this.state;
        Object.keys(values).forEach(key => mappedObject[key] = values[key].value);
        this.props.handleSubmit(mappedObject);
    }
    render() {
        const { handleSubmit, values} = this.props;
        const fields = values.map((item, index) => {
            return <TextField
                key={index}
                errorText={this.state.errors[item.propName]}
                floatingLabelText={item.propName}
                name={item.propName}
                type={item.propType}
                ref={item.propName}
                value={this.state.values[item.propName].value}
                required={item.isRequired}
                onChange={this.onChange.bind(this)}
                />
        })

        return (
            <div style={{ width: '260px', margin: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        {fields}
                    </div>
                    <div>
                        <RaisedButton label="Submit" onClick={this.submitForm.bind(this)} fullWidth={true} disabled={this.state.disabled} />
                    </div>
                </form>
            </div>
        )

    }
}
Form.propTypes = {
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSubmit: PropTypes.func.isRequired
}

module.exports = Form;