import {UPDATE_USER_LISTS, FETCH_RECIPES_PENDING, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_ERROR,
    FETCH_SHOPPINGLIST_PENDING, FETCH_SHOPPINGLIST_SUCCESS, FETCH_SHOPPINGLIST_ERROR} from '../actions/types'

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
        case FETCH_RECIPES_PENDING:
            return {
                ...state,
                savedRecipes: undefined
            }
        case FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                savedRecipes: action.savedRecipes
            }
        case FETCH_RECIPES_ERROR:
            return {
                ...state,
                savedRecipes: []
            }
        case FETCH_SHOPPINGLIST_PENDING:
            return {
                ...state,
                shoppingList: undefined
            }
        case FETCH_SHOPPINGLIST_SUCCESS:
            return {
                ...state,
                shoppingList: action.shoppingList
            }
        case FETCH_SHOPPINGLIST_ERROR:
            return {
                ...state,
                shoppingList: []
            }
        default:
            return state
    }
}