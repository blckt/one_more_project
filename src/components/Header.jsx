import React from 'react';
import { AppBar } from 'material-ui';
import { connect } from 'react-redux';
import { logout } from '../actions/usersActions.js';
import { bindActionCreators } from 'redux';
import Login from './Login';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { TextField } from 'material-ui';

const Logged = (props) => (
    <div>
        <span> {props.email}</span>
        <IconMenu
            {...props}
            iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
            <MenuItem primaryText="Sign out" onClick={props.logOut} />
        </IconMenu>
    </div>
);

Logged.propTypes = {
    email: React.PropTypes.string.isRequired
}



const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ logout }, dispatch)
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    logout() {
        this.props.logout();
    }
    render() {
        return (<AppBar title="deps"
            iconElementRight={this.props.user && this.props.user.email ? <Logged logOut={this.logout.bind(this)} email={this.props.user.email} /> : <Login />}>

        </AppBar >)
    }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);
// {this.props.user.email}
//             {(()=>{
//                 if(this.props.user.email){                    
//                     return <FlatButton onClick={this.logout.bind(this)}>LOGOUT</FlatButton>
//                 }
//             })()}