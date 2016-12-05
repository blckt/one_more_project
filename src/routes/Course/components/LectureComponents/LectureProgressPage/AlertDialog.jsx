import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ModalDialog extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.decline}
                />,
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={this.props.confirm}
                />,
        ];
        return (<div>
            <Dialog
                actions={actions}
                modal={true}
                open={this.props.open}
                onRequestClose={this.props.decline}
                >
                Lection is over. Are u ready for code task?
        </Dialog>
        </div>)
    }
}

module.exports = ModalDialog;