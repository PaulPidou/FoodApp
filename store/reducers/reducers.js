import { UPDATE_USER_LISTS } from '../actions/types'
import { GET_RECIPES, ADD_RECIPES, REMOVE_RECIPES } from '../actions/types'

const initialState = {
    savedRecipes: undefined,
    shoppingList: undefined,
    fridge: undefined
}

export const generalReducer = function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER_LISTS:
            return {
                ...state,
                savedRecipes: action.lists.savedRecipes,
                shoppingList: action.lists.shoppingList,
                fridge: action.lists.fridge
            }
        default:
            return state
    }
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