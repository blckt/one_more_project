import React from 'react';
require('./style.scss');
import CoursePage from './Course';
import { withRouter } from 'react-router';
import { getCourse } from '../../../actions/courseActions.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const mapStateToProps = (state, ownProps) => {
    return {
        course: <state className="courses course"></state>
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCourse: (id) => {
            dispatch(getCourse(id))
        }
    }
}
class Course extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {id} = this.props.params;
        this.props.getCourse(id);
    }

    render() {
        return (<div>
            {this.props.children || <CoursePage course={this.props.course} />}
        </div>)
    }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(withRouter(Course));  