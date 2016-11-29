import React from 'react'
import { connect } from 'react-redux';

import Header from '../Components/Header';
import { Paper } from 'material-ui';
import Loader from '../components/Loaders'
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
            <Header />
            <Paper style={{ width: '100%', minHeight: '750px' }}>
                {this.props.children}
                <Loader />
            </Paper>
        </div >)
    }
}

module.exports = connect(mapStateToProps)(App);
