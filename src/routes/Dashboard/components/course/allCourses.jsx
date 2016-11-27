import React from 'react';
import { Paper } from 'material-ui'
import { connect } from 'react-redux';

import history from '../../../../utils/createHistory';
import { getCoursesList } from '../../../../actions/usersActions';
import { bindActionCreators } from 'redux';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
const style = {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
};


const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getCoursesList }, dispatch)

class AllCourses extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.getCoursesList();
    }
    handleMenuClick(id) {
        history.push(`/dashboard/course/${id}`);
    }
    render() {

        const {courses} = this.props.courses;
        const coursesList = courses;
        const menuItem = !courses.isFetching && coursesList ? coursesList.map((item, index) =>
            <MenuItem onClick={this.handleMenuClick.bind(this, item.key)} key={index} primaryText={item.course_name} value={index}></MenuItem>) : '';
        return (<div style={{ width: '100%' }}>
            <Paper style={style}>
                {
                    this.props.courses.isFetching ?
                        "Loading..." :
                        menuItem
                }
            </Paper>
        </div>)
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AllCourses);