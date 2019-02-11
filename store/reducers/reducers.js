import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../actions/types'

const initialState = {
    isLoading: false,
    data: {},
    error: undefined
}

const serviceReducer = function(state = initialState, action) {
    switch(action.type) {
        case REQUEST_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.data
            }
        case REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }

}

export default serviceReducer