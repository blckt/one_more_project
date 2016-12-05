import { FireBase } from './initFireBase';

const Promise = require('bluebird');


class LecturesManager extends FireBase {
    constructor() {
        super();
    }
    getLectures(lectures) {

        const keys = lectures.map(lecture => Object.keys(lecture)[0]);
        const promises = keys.map(key => new Promise((resolve, reject) => {
            var ref = this.database.ref('lectures/' + key);
            ref.on('value', (value) => {
                if (value.val()) {
                    const lect = Object.assign({}, value.val(), { key });
                    resolve(lect);
                }
                resolve(value.val());
            })
        }));

        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(data => {
                    if (data) {
                        data = data.filter(item => !!item)
                        resolve(data);
                    }
                })
        })

    }
}

module.exports = new LecturesManager();
module.exports.LecturesManager = LecturesManager