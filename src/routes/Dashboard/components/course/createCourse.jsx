import React, { Component, PropTypes } from 'react';
import { TextField, FloatingActionButton } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCourse } from '../../../../actions/courseActions.js';
import ContentAdd from 'material-ui/svg-icons/content/add';
const mapDispatchToProps = (dispatch) => (bindActionCreators({ addCourse }, dispatch));
class CraeteCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: '',
            image: ''
        }
    }
    handleChange(evt) {
        this.setState({
            courseName: evt.target.value
        })
    }
    handleChangeImage(evt) {
        this.setState({
            image: evt.target.value
        })
    }
    addCourse() {
        this.props.addCourse({
            course_name: this.state.courseName,
            image: this.state.image
        });
    }
    render() {
        return (<div>
            <TextField id="courseName" value={this.state.courseName} placeholder="Course name" onChange={this.handleChange.bind(this)}></TextField>
            <br />
            <TextField id="image" value={this.state.image} placeholder="Image url" onChange={this.handleChangeImage.bind(this)}></TextField>
            <FloatingActionButton onClick={this.addCourse.bind(this)} value="hello">
                <ContentAdd></ContentAdd>
            </FloatingActionButton>
        </div>)
    }
}
module.exports = connect(() => ({}), mapDispatchToProps)(CraeteCourse);