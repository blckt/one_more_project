import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../../utils/createHistory';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { getCoursesList } from '../../../actions/usersActions';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
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

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.getCoursesList();
    }
    handleMenuClick(id) {
        console.log(id)
        console.log(this.props.courses.courses[id]);
    }
    handleCreateTestClick() {
        history.push("/dashboard/course/create");
    }
    render() {
        const {courses} = this.props.courses;
        const menuItem = courses.map((item, index) => <MenuItem onClick={this.handleMenuClick.bind(this, index)} key={index} primaryText={item.course_name} value={index}></MenuItem>)
        return (<Container>
            <Row>
                <FlatButton onClick={this.handleCreateTestClick.bind(this)} primary={true}>Create Course</FlatButton>
            </Row>
            <Row>
                <div style={{ float: 'left' }}>
                    <Paper style={style}>
                        {
                            this.props.courses.isFetching ?
                                "Loading..." :
                                menuItem
                        }
                    </Paper>
                </div>
                <Col>
                    {this.props.children || "Child component"}
                </Col>
            </Row>
        </Container>)
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard);