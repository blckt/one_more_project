import { FireBase } from './initFireBase';

import series from 'async/series';


class LecturesManager extends FireBase {
    constructor() {
        super();
    }
    getLectures(lectures) {

        const keys = lectures.map(lecture => Object.keys(lecture)[0]);
        const promises = keys.map(key => cb => {
            var ref = this.database.ref('lectures/' + key);
            ref.on('value', (value) => {
                if (value.val()) {
                    const lect = Object.assign({}, value.val(), { key });
                    return cb(null, lect);
                }
                return cb(null, value.val());
            })
        });

        return new Promise((resolve, reject) => {
            series(promises, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })

    }
}

module.exports = new LecturesManager();
module.exports.LecturesManager = LecturesManager