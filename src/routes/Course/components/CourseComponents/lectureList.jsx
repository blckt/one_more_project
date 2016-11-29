
import React, { Component, PropTypes } from 'react';

import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
var ReactMarkdown = require('react-markdown');
class LectureListItem extends Component {
    static propTypes = {
        lecture: PropTypes.shape({
            lectureName: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            tasks: PropTypes.array.isRequired,
            courseKey: PropTypes.string.isRequired
        }).isRequired
    }
    render() {
        const lecture = this.props.lecture;
        return (
            <div className="lecture-item">
                <Card>
                    <CardHeader title={lecture.lectureName}
                        actAsExpander={true}
                        showExpandableButton={true}
                        subtitle={`Lecture # ${this.props.index}`}
                        >

                    </CardHeader>
                    <CardText expandable={true}>
                        <ReactMarkdown source={lecture.description}></ReactMarkdown>
                    </CardText>
                    <CardActions>
                        <FlatButton primary={true} label="Watch" />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default LectureListItem;