import React from 'react';

const CreateTestForm = require('./createCourse');

class CreateTest extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
            <CreateTestForm></CreateTestForm>
        </div>)
    }
}

module.exports = CreateTest;