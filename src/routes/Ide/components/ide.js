import React from 'react';

import { withRouter } from 'react-router';
import { findDOMNode } from 'react-dom';

import { Col, Row, Button, Grid, ButtonToolbar, Panel, Well } from 'react-bootstrap';
import { getTask } from '../../../actions/tasksActions';

import Notifications from './Notification';
import brace from 'brace'; //eslint-disable-line
import Ace from 'react-ace';

import 'brace/mode/csharp';
import 'brace/theme/github';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';




const mapDispatchToProps = (dispatch) => bindActionCreators({ getTask }, dispatch)
const mapStateToProps = (state, ownProps) => {
  return {
    task: state.courses.task
  }
}
class Ide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      code: ''
    };
  }
  componentWillMount() {
    const { id } = this.props.params;
    this.setState({ taskId: id });
    this.props.getTask(id);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.task)
      this.setState({ task: newProps.task, code: newProps.task.Template });
  }
  componentDidMount() {
    this.initEvents({});
  }
  initEvents(task) {
    const sumbitBtn = findDOMNode(this.refs.submit_btn);
    const updateTask = findDOMNode(this.refs.updateTask_btn);
    var myHeaders = new Headers();
    sumbitBtn.addEventListener('click', () => {
      fetch(`${API_URL}task/${this.state.taskId}/verify`, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }),
        body: JSON.stringify({ code: this.state.code, task: this.state.task })
      })
        .then(data => data.json())
        .then(result => {
          this.setState({ result })
        })
      // fetch(`${API_URL}task/${this.state.taskId}/verify`, 'POST', JSON.stringify({ code: this.state.code }))
      //   .then(data => data.json())
      //   .then(result => this.setState({ result }));
    });
    updateTask.addEventListener('click', () => {
      let {task} = this.state;
      task.Template = this.state.code;
      fetchUrl(`task/${this.state.taskId}/update`, 'POST', JSON.stringify(task))

    });
  }
  codeChange(code) {
    this.setState({
      code
    });
  }
  render() {
    console.log(this.state.task)
    return (
      <div className="container">
        <Row>
          {(() => {
            if (this.state.task) {
              return (<div>

                <Panel header={this.state.task.TaskName}>
                  <div className="row">
                    <div className="col-sm-8">
                      <Ace
                        className="editor"
                        width="100%"
                        height="350px"
                        mode="csharp"
                        theme="github"
                        value={this.state.code}
                        onChange={this.codeChange.bind(this)}
                        />
                    </div>
                    <div className="col-sm-4">
                      <Well>
                        {this.state.task.Description}
                      </Well>
                      {this.state.result && <Notifications {...this.state.result} />}
                    </div>
                  </div>
                  <Row style={{ margin: '10px 0' }}>
                    <Col sm={4}>
                      <ButtonToolbar>
                        <Button bsStyle="info" ref="submit_btn"> Submit </Button>
                        <Button bsStyle="danger" ref="updateTask_btn"> Update</Button>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </Panel>

              </div>
              );
            }
          })()}
        </Row>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(withRouter(Ide));
