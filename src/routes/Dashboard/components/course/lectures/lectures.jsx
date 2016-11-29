import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLecture } from '../../../../../actions/courseActions.js'
import { getTasks } from '../../../../../actions/tasksActions.js';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { FlatButton, AutoComplete, SvgIcon } from 'material-ui'
import ChipInput from 'material-ui-chip-input'
import RichTextEditor from 'react-rte';
import CloseIcon from 'material-ui/svg-icons/navigation/close.js';
var Dropzone = require('react-dropzone');
const mapStateToProps = (state, ownProps) => {
    return {
        storage: state.storage,
        tasks: state.courses.tasks,
        progress: state.storage.progress
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ addLecture, getTasks }, dispatch)


class AddLecture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lectureName: '',
            editorState: RichTextEditor.createEmptyValue(),
            selectedTasks: []
        }
    }
    componentWillMount() {
        this.props.getTasks();
    }
    handleSubmit = () => {
        console.log('helllooo')
    }

    handleChange = (evt) => {
        var state = {};
        state[evt.target.id] = evt.target.value
        this.setState(Object.assign({}, this.state, state));
    }
    handleChangeEditor = (editorState) => {
        this.setState({ editorState })
    }
    autoCompleteChange = (chips) => {
        this.setState({
            selectedTasks: this.props.tasks.filter(task => {
                return chips.some(chip => task.key === chip.key)
            })
        })

    }
    onDrop = data => {
        this.setState({
            file: data[0]
        });
    }
    removeFile() {
        this.setState({
            file: null
        })
    }
    addLecture() {

        const lecture = {
            lectureName: this.state.lectureName,
            selectedTasks: this.state.selectedTasks,
            description: this.state.editorState.toString('markdown'),
            file: this.state.file,
            courseKey: this.props.courseKey
        };
        this.props.addLecture(lecture);
    }
    render() {
        const tasksNames = this.props.tasks.length > 0 ? this.props.tasks.map(item => ({
            TaskName: item.TaskName, key: item.key
        })) : [];
        return (<div>
            <form>
                <FormGroup style={{
                    margin: '10px',
                    border: '1px solid grey'
                }}>
                    <ControlLabel>
                        Lecture Name
            </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.lectureName}
                        placeholder="Enter text"
                        id="lectureName"
                        onChange={this.handleChange}
                        />
                </FormGroup>
                <FormGroup style={{
                    margin: '10px',
                    border: '1px solid grey'
                }}>
                    <ControlLabel>
                        Description
                  </ControlLabel>
                    <RichTextEditor id="editorState"

                        value={this.state.editorState} onChange={this.handleChangeEditor}></RichTextEditor>
                </FormGroup>
                <FormGroup style={{
                    margin: '10px',
                    border: '1px solid grey'
                }}>
                    <ControlLabel>
                        Select task
                </ControlLabel>
                    <ChipInput
                        floatingLabelText="Select code task"
                        filter={AutoComplete.fuzzyFilter}
                        onChange={this.autoCompleteChange}
                        dataSource={tasksNames}
                        maxSearchResults={10}
                        dataSourceConfig={{ text: 'TaskName', value: 'key' }}
                        ></ChipInput>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>
                        Upload pdf file
                </ControlLabel>
                    {!this.state.file ? <Dropzone onDrop={this.onDrop} style={{
                        height: '150px',
                        border: '1px solid grey'
                    }}
                        accept={"application/pdf"}
                        >
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone> : <div>{this.state.file.name} <CloseIcon onClick={this.removeFile.bind(this)}></CloseIcon></div>}
                </FormGroup>
                <FormGroup>
                    <FlatButton secondary={true} onClick={this.addLecture.bind(this)}>Save</FlatButton>
                </FormGroup>
            </form>
        </div >)
    }
}



module.exports  =   connect(mapStateToProps,mapDispatchToProps)(AddLecture);                                                                 