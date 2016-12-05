import React from 'react';
var PDF = require('pdfjs-dist');
const Loader = require('components/Loaders.jsx');
const Promise = require('bluebird');
import store from 'utils/createStore';
import * as storageActions from 'action/storageActions.js';
PDF.PDFJS.useOnlyCssZoom = true;
PDF.PDFJS.disableTextLayer = true;
PDF.PDFJS.maxImageSize = 1024 * 1024;
const styles = {}


class PdfView extends React.Component {
    constructor(props) {
        super(props);
        this.fetchPdf = this.fetchPdf.bind(this);
        this.state = {
            currentPage: 1,
            isFetch: false,
            progress: 0
        }
    }
    componentDidMount() {
        this.setState({
            url: this.props.url
        });
        PDF.PDFJS.disableWorker = true;

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
    fetchPdf = (url) => new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";
        xhr.open("GET", url, true);
        xhr.onload = function (e) {
            store.dispatch(storageActions.uploadFinished());
            resolve(new Uint8Array(this.response));
        }
        xhr.onprogress = (e) => {
            const progress = (e.loaded / e.total) * 100;
            store.dispatch(storageActions.onProgress(progress))
            this.setState({
                progress: e.loaded,
                total: e.total
            })
        }
        xhr.send();

    })
    getPDF(url) {

        if (!this.state.isFetch) {
            var ftch = this.fetchPdf(url)
                .then(buffer => {
                    this.setState({
                        isFetch: false,
                        progress: 0
                    })
                    return buffer;
                });
            this.setState({
                fetch: ftch,
                isFetch: true,
                progress: 0
            })
            return ftch;
        }


        return this.state.fetch
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
            {(() => {
                if (this.state.isFetch) {
                    return <Loader prog={this.state.progress} max={this.state.total}></Loader>
                } else {
                    return <canvas onDoubleClick={this.nextPage.bind(this)} ref={(c) => this.canvas = c}>
                    </canvas>
                }
            })()}
        </div>)
    }
}


module.exports = PdfView;