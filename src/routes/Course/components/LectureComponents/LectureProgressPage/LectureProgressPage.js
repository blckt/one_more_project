import React from 'react';
import cssModule from 'react-css-modules';
//import styles from './LectureProgressPage.css';
import { withRouter } from 'react-router';
import Pdf from './PdfView.jsx'
import Dialog from './AlertDialog.jsx';
import History from 'util/createHistory.js';
class LectureProgressPage extends React.Component {
  static propTypes = {

  }
  state = {
    open: false
  }
  componentWillMount() {
    this.setState({ lecture: this.props.location.state })
  }
  _onDocumentCompleted(pages) {
    this.setState({ pages: pages });
  }
  _onPageCompleted(page) {
    this.setState({ currentPage: page });
  }
  handleEnd() {
    this.setState({
      open: true
    })
  }
  handleDialogResult(evt) {
    History.push(`/task/${Object.keys(this.state.lecture.tasks[0])[0]}`)
    this.setState({
      open: false
    })
  }
  handleDecline() {
    this.setState({
      open: false
    })
  }
  render = () => {
    return (<div>
      <Pdf url={this.state.lecture.file} documentEnd={this.handleEnd.bind(this)}></Pdf>
      <Dialog confirm={this.handleDialogResult.bind(this)} decline={this.handleDecline.bind(this)} open={this.state.open}></Dialog>
    </div>)
  }
}

export default withRouter(LectureProgressPage);
