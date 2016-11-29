import React, { Component, PropTypes } from 'react';

import { Paper, Subheader, RaisedButton } from 'material-ui';

import history from '../../../../utils/createHistory.js';

class CourseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }

    }
    componentDidMount() {
        if (/\/addLecture/.test(location.pathname)) {
            this.setState({
                disabled: true
            })
        } else {
            this.setState({
                disabled: false
            })
        }
    }
    addLecture = () => {
        history.push(location.pathname + '/addLecture')
    }
    componentWillReceiveProps() {
        if (/\/addLecture/.test(location.pathname)) {
            this.setState({
                disabled: true
            })
        } else {
            this.setState({
                disabled: false
            })
        }
    }
    render() {
        const {course} = this.props;
        return (<div>
            <Paper>
                <Subheader>
                    {course.course_name}
                    <RaisedButton disabled={this.state.disabled} onClick={this.addLecture.bind(this)} style={{ float: 'right' }}> Add lecture</RaisedButton>
                </Subheader>
                {
                    (() => {
                        if (this.props.children && course.key) {
                            if (typeof (this.props.children) !== 'string')
                                return React.cloneElement(this.props.children, { courseKey: course.key })
                            else return this.props.children
                        } else {
                            return "course still loadinngg.."
                        }
                    })()
                }
            </Paper>
        </div>)
    }
}

CourseInfo.propTypes = {
    course: PropTypes.object.isRequired
}


module.exports = CourseInfo;
