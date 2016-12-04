import React from 'react';
var PDF = require('pdfjs-dist');
//require('./pdf.css')

PDF.PDFJS.useOnlyCssZoom = true;
PDF.PDFJS.disableTextLayer = true;
PDF.PDFJS.maxImageSize = 1024 * 1024;
const styles = {}
class PdfView extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            currentPage: 1
        }
    }
    componentDidMount() {
        this.setState({
            url: this.props.url
        });
        this.getPDF(this.props.url)
        PDF.PDFJS.disableWorker = true;
        const headers = new Headers();
        headers.append(
            "Access-Control-Allow-Origin", "*"
        )
        console.log(headers);
        const docInit = {
            url: this.props.url,
            withCredentials: true,
            headers
        }
        this.getPDF(this.props.url)
            .then(buffer => {
                const loadingTask = PDF.getDocument(buffer);
                loadingTask.promise.then((data) => {
                    this.setState({
                        pdfData: data,
                        maxPage: data.pdfInfo.numPages
                    })
                    data.getPage(this.state.currentPage)
                        .then(this.renderPage.bind(this))
                })
            })
    }
    getPDF(url) {
        return fetch(url)
            .then(data => data.arrayBuffer())
    }
    nextPage() {
        this.changePage(this.state.currentPage + 1);
    }
    prevPage() {
        this.changePage(this.state.currentPage - 1);
    }
    changePage(pageNumber) {

        if (pageNumber < 1) {
            return;
        }
        else {
            if (pageNumber > this.state.maxPage) {
                this.props.documentEnd();
            } else {
                this.state.pdfData.getPage(pageNumber)
                    .then(page => {
                        this.renderPage(page);
                        this.setState({
                            currentPage: pageNumber
                        })
                    })
            }
        }
    }
    renderPage(page) {
        {
            var scale = 1.0;
            var viewport = page.getViewport(scale);
            var canvas = this.canvas;
            var context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        }
    }
    render() {
        return (<div>
            <button onClick={this.prevPage.bind(this)}>prev page</button>
            <button onClick={this.nextPage.bind(this)}>next page</button>
            <canvas onDoubleClick={this.nextPage.bind(this)} ref={(c) => this.canvas = c}>
            </canvas></div>)
    }
}


module.exports = PdfView;