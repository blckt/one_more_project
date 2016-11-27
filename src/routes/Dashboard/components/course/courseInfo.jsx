import React, { Component, PropTypes } from 'react';

import { Paper, Subheader } from 'material-ui';

class CourseInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {course} = this.props;
        return (<div>
            <Paper>
                <Subheader>
                    {course.course_name}
                </Subheader>
            </Paper>
        </div>)
    }
}

CourseInfo.propTypes = {
    course: PropTypes.object.isRequired
}


module.exports = CourseInfo;
