import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../actions/types'

const initialState = {
    data: undefined
}

const serviceReducer = function(state = initialState, action) {
    switch(action.type) {
        case REQUEST_PENDING:
            return {
                ...state,
                data: undefined
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case REQUEST_ERROR:
            return {
                ...state,
                data: []
            }
        default:
            return state
    }

}

export default serviceReducer