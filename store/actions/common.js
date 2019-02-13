import {Toast} from 'native-base'
import {REQUEST_ERROR, REQUEST_PENDING, REQUEST_SUCCESS} from "./types"

export const requestActionPending = () => ({
    type: REQUEST_PENDING
})

export const requestActionSuccess = (data) => ({
    type: REQUEST_SUCCESS,
    data: data
})

export const requestActionError = function() {
    Toast.show({
        text: 'Un problème est survenu !',
        textStyle: { textAlign: 'center' },
        buttonText: 'Ok'
    })
    return {
        type: REQUEST_ERROR
    }
}