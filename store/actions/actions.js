import {Toast} from 'native-base'
import { requestActionPending, requestActionSuccess, requestActionError } from './common'

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
            Toast.show({
                        text: 'Un problème est survenu !',
                        textStyle: { textAlign: 'center' },
                        buttonText: 'Ok'
                    })
                dispatch(requestActionError())
            })
        */
    }
}