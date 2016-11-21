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
import { Link } from 'react-router';
import { TextField, Tab, Tabs, DropDownMenu, Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator } from 'material-ui';
import history from '../utils/createHistory.js';
import { withRouter } from 'react-router';
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
const styles = {
    margin: {
        margin: '0 20px'
    }
}
const handleMenuChange = (value) => {

    history.push(value);
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: 1,
            pathname: '/'
        }
    }
    logout() {
        this.props.logout();
    }
    handleMenu(pathname, ss) {
        this.setState({ pathname });
        history.push(pathname);
    }
    componentWillMount() {
        const {pathname} = this.props.router.location;
        this.setState({ pathname });
    }
    render() {
        const isLogged = this.props.user && this.props.user.email ? <Logged logOut={this.logout.bind(this)} email={this.props.user.email
        } /> : <Login />;
        return (
            <AppBar title="deps"
                showMenuIconButton={false}
                >
                <Tabs value={this.state.pathname} onChange={this.handleMenu.bind(this)}>
                    <Tab style={styles.margin} value={"/"} label="Courses" />
                    <Tab style={styles.margin} value={"/dashboard"} label="Dashboard" />
                </Tabs>
                {isLogged}
            </AppBar >
        )
    }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

// {this.props.user.email}
//             {(()=>{
//                 if(this.props.user.email){                    
//                     return <FlatButton onClick={this.logout.bind(this)}>LOGOUT</FlatButton>
//                 }
//             })()}