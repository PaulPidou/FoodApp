import { connect } from 'react-redux'
import { requestActionPending, requestActionSuccess, requestActionError } from './common'
import SearchIngredientScreen from '../../screens/SearchIngredientScreen'

const mapStateToProps = (state) => ({
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchIngredientScreen)