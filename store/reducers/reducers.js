import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../actions/types'
import { GET_RECIPES, ADD_RECIPES, REMOVE_RECIPES } from '../actions/types'

const initialState = {
    savedRecipes: [],
    shoppingList: [],
    fridge: []
}

export const savedRecipesReducer = function(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                savedRecipes: undefined
            }
        case ADD_RECIPES:
            return {
                ...state,
                savedRecipes: action.data
            }
        case REMOVE_RECIPES:
            return {
                ...state,
                savedRecipes: []
            }
        default:
            return state
    }
}

export const getAllIngredientsReducer = function(state = initialState, action) {
    switch(action.type) {
        case REQUEST_PENDING:
            return {
                ...state,
                ingredients: undefined
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                ingredients: action.data
            }
        case REQUEST_ERROR:
            return {
                ...state,
                ingredients: []
            }
        default:
            return state
    }
}