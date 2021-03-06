import { handleActions } from 'redux-actions';
import { ActionTypes, STATUS, renderMessage } from 'constants/index';
import update from 'immutability-helper'
export const initial = {
    status: STATUS.IDLE,
    message: "",
    jobList: null,
    jobListProject: null
}

export default {
    job: handleActions({

        // POST JOB ACTION
        [ActionTypes.POST_JOB]: (state, { response }) => update(state, {
            status: { $set: STATUS.RUNNING },
        }),
        [ActionTypes.POST_JOB_SUCCESS]: (state, { response }) => {

            return update(state, {
                status: { $set: STATUS.SUCCESS },
                jobListProject: { $push: [response] }
            })
        },
        [ActionTypes.POST_JOB_ERROR]: (state, { error }) => {
            return update(state, {
                status: { $set: STATUS.ERROR },
                message: { $set: renderMessage(error.status) }
            })
        },


        // POST JOB ACTION
        [ActionTypes.GET_JOB_DETAIL]: (state, { response }) => update(state, {
            status: { $set: STATUS.RUNNING },
        }),
        [ActionTypes.GET_JOB_DETAIL_SUCCESS]: (state, { response }) => {

            return update(state, {
                status: { $set: STATUS.SUCCESS },
            })
        },
        [ActionTypes.GET_JOB_DETAIL_ERROR]: (state, { error }) => {
            return update(state, {
                status: { $set: STATUS.ERROR },
                message: { $set: renderMessage(error.status) }
            })
        },


        // POST JOB ACTION
        [ActionTypes.DELETE_JOB]: (state, { response }) => update(state, {
            status: { $set: STATUS.RUNNING },
        }),
        [ActionTypes.DELETE_JOB_SUCCESS]: (state, { response }) => {
            return update(state, {
                status: { $set: STATUS.SUCCESS },
                jobListProject: {
                    $splice: [
                        [state.jobListProject[state.jobListProject.findIndex((e) => e._id === response._id)], 1]
                    ]
                }
            })
        },
        [ActionTypes.DELETE_JOB_ERROR]: (state, { error }) => {
            return update(state, {
                status: { $set: STATUS.ERROR },
                message: { $set: renderMessage(error.status) }
            })
        },

        // POST JOB ACTION
        [ActionTypes.UPDATE_JOB]: (state, { response }) => update(state, {
            status: { $set: STATUS.RUNNING },
        }),
        [ActionTypes.UPDATE_JOB_SUCCESS]: (state, { response }) => {

            return update(state, {
                status: { $set: STATUS.SUCCESS },
                jobListProject: { [state.jobListProject.findIndex((e) => e._id === response._id)]: { $set: response } }
            })
        },
        [ActionTypes.UPDATE_JOB_ERROR]: (state, { error }) => {
            return update(state, {
                status: { $set: STATUS.ERROR },
                message: { $set: renderMessage(error.status) }
            })
        },


        // POST JOB ACTION
        [ActionTypes.LIST_JOB]: (state, { response }) => update(state, {
            status: { $set: STATUS.RUNNING },
        }),
        [ActionTypes.LIST_JOB_SUCCESS]: (state, { response }) => {
          
            if (response.type === "all")
                return update(state, {
                    status: { $set: STATUS.SUCCESS },
                    jobList: { $set: response.data }
                })
            else if (response.type === "project")
                return update(state, {
                    status: { $set: STATUS.SUCCESS },
                    jobListProject: { $set: response.data }
                })
        },
        [ActionTypes.LIST_JOB_ERROR]: (state, { error }) => {
            return update(state, {
                status: { $set: STATUS.ERROR },
                message: { $set: error && error.status && renderMessage(error.status) }
            })
        },

    }, initial),
};

