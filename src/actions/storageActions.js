import fb from '../utils/initFireBase';

import * as consts from '../constants/storageConstants';



export const onProgress = (progress) => {
    return {
        type: consts.ON_PROGRESS,
        progress,
        display: true
    }
}

export const uploadFinished = (progress) => {
    console.log(progress)
    return {
        type: consts.ON_PROGRESS,
        progress: null,
        display: false
    }
};