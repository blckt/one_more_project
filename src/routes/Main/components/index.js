import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCoursesList } from '../../../actions/usersActions';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getCoursesList }, dispatch)
class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.getCoursesList();
    }
    render() {
        const {courses} = this.props.courses;
        const items = courses.length === 0 ? <h4>No courses yet..</h4> :
            <GridList cellHeight={180}>
               {courses.map((item,index)=>
                   <GridTile key={index} title={item.course_name}>
                   <img src={item.image} alt={item.course_name}/>
                   </GridTile>)}
            </GridList>

        return (
            <div>
                <h1>Courses</h1>
                {this.props.courses.isFetching ? <h4>Loading..</h4> : items}
            </div>
        )
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(MainPage);