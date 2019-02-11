import {REQUEST_ERROR, REQUEST_PENDING, REQUEST_SUCCESS} from "./types"

export const requestActionPending = () => ({
    type: REQUEST_PENDING
})

export const requestActionError = (error) => ({
    type: REQUEST_ERROR,
    error: error
})

export const requestActionSuccess = (data) => ({
    type: REQUEST_SUCCESS,
    data: data
})