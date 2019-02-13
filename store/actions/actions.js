import { requestActionPending, requestActionSuccess, requestActionError } from './common'

// Public
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
                dispatch(requestActionError())
            })
        */
    }
}

// User
export const getSavedRecipesSummary = function() {
    return dispatch => {
        dispatch(requestActionPending())
        dispatch(requestActionSuccess(
            [
                {
                    _id: '123',
                    title: 'Super recipe 1',
                    budget: 'bon marché',
                    difficulty: 'facile',
                    totalTime: '50'
                },
                {
                    _id: '424',
                    title: 'Super recipe 2',
                    budget: 'assez cher',
                    difficulty: 'difficile',
                    totalTime: '80'
                }
            ]
        ))
    }
}

export const getShoppingList = function() {
    return dispatch => {
        dispatch(requestActionPending())
        dispatch(requestActionSuccess(
            [
                {
                    _id: 123,
                    ingredientID: 123,
                    ingredientName: 'abricot',
                },
                {
                    _id: 456,
                    ingredientID: 456,
                    ingredientName: 'lait',
                    quantity: 500,
                    unit: 'ml',
                }
            ]
        ))
    }
}