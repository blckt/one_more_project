import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ logout }, dispatch)
class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    render() {
        return (
            <div>
                <h1>Courses</h1>
                <h4>No courses yet..</h4>
            </div>
        )
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(MainPage);