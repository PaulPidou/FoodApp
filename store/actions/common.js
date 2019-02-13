import {REQUEST_ERROR, REQUEST_PENDING, REQUEST_SUCCESS} from "./types"

export const requestActionPending = () => ({
    type: REQUEST_PENDING
})

export const requestActionError = () => ({
    type: REQUEST_ERROR
})

export const requestActionSuccess = (data) => ({
    type: REQUEST_SUCCESS,
    data: data
})