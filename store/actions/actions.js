import { connect } from 'react-redux'
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from './types'
import SearchIngredientScreen from '../../screens/SearchIngredientScreen'

const mapStateToProps = (state) => ({
    isLoading: state.savedRecipesReducer.isLoading,
    error: state.savedRecipesReducer.error,
    data: state.savedRecipesReducer.data
})

const mapDispatchToProps = (dispatch) => ({
    getAllIngredients: () => dispatch(getAllIngredients())
})

export const getAllIngredients = function() {
    return dispatch => {
        dispatch(requestActionPending())
        dispatch(requestActionSuccess(
            [
                { "_id": "123", "name": 'abricot' },
                { "_id": "234", "name": 'beurre' },
                { "_id": "345", "name": 'farine' },
                { "_id": "456", "name": 'salade' },
                { "_id": "567", "name": 'saumon' },
                { "_id": "678", "name": 'thon' },
                { "_id": "789", "name": 'tortilla' },
            ]
        ))

        /*
        fetch(`${process.env.API_ROOT}/public/ingredients`)
            .then(response => {
                dispatch(requestActionSuccess(response.json()))
            })
            .catch(error => {
                dispatch(requestActionError(error))
            })
        */
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchIngredientScreen)