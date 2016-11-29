const fb = require('../utils/initFireBase');
import * as constants from '../constants/tasksConstants';
import history from '../utils/createHistory';

export const addCourse = (course) => {
    return dispatch => {
        history.push("/dashboard");
        fb.addCourse(course).then(data => console.log(data));
        dispatch({
            type: "ADD_COURSE"
        });
    }
}

export const getTask = (id) => {
    return dispatch => {
        fb.getTask(id)
            .then(task => {
                dispatch({
                    type: constants.GET_TASK,
                    task: task
                })
            })
    }
}

export const getTasks = () => {
    return dispatch => {
        fb.getTasks()
            .then(tasks => {
                dispatch({
                    type: constants.GET_TASKS,
                    tasks
                })
            })
    }
}