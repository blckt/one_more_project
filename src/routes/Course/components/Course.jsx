import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCourseLectures } from '../../../actions/courseActions.js';
import { Avatar, Paper, List, ListItem, makeSelectable, RaisedButton } from 'material-ui';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
let SelectableList = makeSelectable(List);

import LectureListItem from './CourseComponents/lectureList';

const mapStateToProps = (state, ownProps) => {
    return {
        lectures: state.courses.lectures
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getLectures: (lectures) => {
            dispatch(getCourseLectures(lectures));
        }
    }
};

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetched: false
        }
    }

    static propTypes = {
        course: PropTypes.object.isRequired
    }
    componentWillReceiveProps(nextProps) {
        const {course, lectures} = nextProps;
        if (course.course_name && !this.state.isFetched) {
            this.props.getLectures(course.lectures);
            this.setState({
                isFetched: true
            })
        }
    }

    render() {
        const {course        } = this.props;
        let lectures = {};
        if (this.props.lectures) {
            lectures = this.props.lectures.lectures.filter(lect => lect);
        }
        return (
            <div>
                <Paper >
                    <Card>
                        <CardHeader title={this.props.course.course_name}></CardHeader>
                        <div className="course-content">
                            <div className="course-logo">
                                <img src={`${course.image}`} alt="" />
                                <RaisedButton primary={true} fullWidth={true} >ENROLL</RaisedButton>
                            </div>
                            <div className="lectures-list">
                                <SelectableList>
                                    {(() => {
                                        if (course.lectures && lectures.length) {
                                            return lectures.map((lecture, i) => <LectureListItem key={i} index={i + 1} lecture={lecture}></LectureListItem>)
                                        }
                                    })()}
                                </SelectableList>
                            </div>
                        </div>

                    </Card>


                </Paper>
            </div>
        );
    }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Course);                           