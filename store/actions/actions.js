import { connect } from 'react-redux'
import { ADD_RECIPES, REQUEST_ERROR, REQUEST_PENDING, REQUEST_SUCCESS } from './types'

const api_ip = 'http://192.168.43.163:3000/api'

export const getAllIngredients = function() {
    return dispatch => {
        dispatch(requestActionPending())
        fetch(`${api_ip}/public/ingredients`)
            .then(response => {
                dispatch(requestActionSuccess(response.json()))
            })
            .catch(error => {
                dispatch(requestActionError(error))
            })
    }

    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        { "_id": "123", "name": 'abricot' },
        { "_id": "234", "name": 'beurre' },
        { "_id": "345", "name": 'farine' },
        { "_id": "456", "name": 'salade' },
        { "_id": "567", "name": 'saumon' },
        { "_id": "678", "name": 'thon' },
        { "_id": "789", "name": 'tortilla' },
    ]
    */
}

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