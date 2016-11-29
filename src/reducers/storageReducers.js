import *  as consts from '../constants/storageConstants';

const file = {
    downloadUrl: '',
    progress: null,
    display: false
}
const storageReducers = (state = file, action) => {
    switch (action.type) {
        case consts.UPLOAD_FILE: {
            return Object.assign({}, state, action.fileUrl);
        }
        case consts.ON_PROGRESS: {
            return Object.assign({}, state, { progress: action.progress, downloadUrl: action.downloadUrl, display: action.display })
        }

        default: return state;
    }
}

export default storageReducers;
