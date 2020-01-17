import { UPDATE_USER_LISTS, FETCH_RECIPES_PENDING, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_ERROR,
    FETCH_SHOPPINGLIST_PENDING, FETCH_SHOPPINGLIST_SUCCESS, FETCH_SHOPPINGLIST_ERROR,
    FETCH_FRIDGE_PENDING, FETCH_FRIDGE_SUCCESS, FETCH_FRIDGE_ERROR } from '../actions/types'
import {AsyncStorage} from "react-native"

const initialState = {
    savedRecipes: undefined,
    shoppingList: undefined,
    fridge: undefined
}

export const generalReducer = function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER_LISTS:
            AsyncStorage.setItem('savedRecipes', JSON.stringify(action.lists.savedRecipes))
            AsyncStorage.setItem('shoppingList', JSON.stringify(action.lists.shoppingList))
            AsyncStorage.setItem('fridge', JSON.stringify(action.lists.fridge))
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
            AsyncStorage.setItem('savedRecipes', JSON.stringify(action.savedRecipes))
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
            AsyncStorage.setItem('shoppingList', JSON.stringify(action.shoppingList))
            return {
                ...state,
                shoppingList: action.shoppingList
            }
        case FETCH_SHOPPINGLIST_ERROR:
            return {
                ...state,
                shoppingList: []
            }
        case FETCH_FRIDGE_PENDING:
            return {
                ...state,
                fridge: undefined
            }
        case FETCH_FRIDGE_SUCCESS:
            AsyncStorage.setItem('fridge', JSON.stringify(action.fridge))
            return {
                ...state,
                fridge: action.fridge
            }
        case FETCH_FRIDGE_ERROR:
            return {
                ...state,
                fridge: []
            }
        default:
            return state
    }
}