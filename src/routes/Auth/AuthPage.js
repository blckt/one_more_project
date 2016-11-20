import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import RegPage from './pages/Register.jsx';
import SignPage from './pages/Signin.jsx';
const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            user: {
                Email: null,
                UserName: null,
                Password: null,
                ConfirmPassword: null
            }
        };
    }

    handleChange(value) {
        this.setState({
            slideIndex: value
        })
    }
    render() {
        return (<div>
            <Tabs value={this.state.slideIndex} onChange={this.handleChange.bind(this)}>
                <Tab label="Signin" value={0} />
                <Tab label="Signup" value={1} />
            </Tabs>
            <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange.bind(this)}>
                <div>
                    <SignPage handleLogin={() => { } } user={{ Email: null, Password: null }}></SignPage>
                </div>
                <div style={styles.slide}>
                    <RegPage user={this.state.user} submitAction={() => { } }></RegPage>
                </div>
            </SwipeableViews>
        </div>)
    }
}


module.exports = AuthPage;
