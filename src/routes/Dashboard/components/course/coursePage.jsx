import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

import { getCourse } from '../../../../actions/courseActions.js';

import CourseInfo from './courseInfo';


const mapDispatchToProps = (dispatch) => bindActionCreators({ getCourse }, dispatch)

const mapStateToProps = (state, ownProps) => {
    return {
        course: state.courses.course
    }
}

class CreateTest extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        const {id} = this.props.params;
        if (id) {
            this.props.getCourse(id);
        }
    }
    render() {
        return (<div>
            {!this.props.course.isFetching ? <CourseInfo course={this.props.course}></CourseInfo> : "Loading..."}
        </div>)
    }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateTest));    