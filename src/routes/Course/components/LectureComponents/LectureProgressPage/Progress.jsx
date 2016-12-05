import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';



const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.storage.progress,
        display: state.storage.display
    }
}
class Loader extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        completed: this.props.progress,
        display: this.props.display
    }
    progress(completed) {
        if (completed > 100) {
            this.setState({ completed: 100 });
        } else {
            this.setState({ completed });
        }
    }
    handleClose() {
        if (this.state.progress === 100) {
            this.setState({
                display: false
            })
        }
    }
    render() {
        const styles = {
            display: this.props.display ? 'block' : 'none',
            position: 'fixed',
            backgroundColor: 'rgba(15,15,15,0.05)',
            width: '100%',
            height: '100%',
            zIndex: 350000000,
            top: 0
        }
        const innerStyle = {
            left: '50%',
            top: '50%',
            position: 'relative',
            width: '100px',
            height: '100px',
            transform: 'translate(-85%,-80%)',
            transition: 'all 1s'
        }
        return (<div style={styles} onClick={this.handleClose.bind(this)}>
        
            <CircularProgress
                mode="determinate"
                value={this.props.progress || this.props.prog}
                size={this.props.max || 100}
                color={'#D50000'}
                thickness={5}
                max={100}
                min={0}
                style={innerStyle}
                />
        </div>)
    }
}

module.exports = Loader;