import { UPDATE_USER_LISTS, FETCH_RECIPES_PENDING, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_ERROR,
    FETCH_RECIPES_DETAILS_PENDING, FETCH_RECIPES_DETAILS_SUCCESS, LOAD_RECIPES_DETAILS, REMOVE_RECIPES_DETAILS,
    FETCH_SHOPPINGLIST_PENDING, FETCH_SHOPPINGLIST_SUCCESS, FETCH_SHOPPINGLIST_ERROR,
    FETCH_FRIDGE_PENDING, FETCH_FRIDGE_SUCCESS, FETCH_FRIDGE_ERROR, TOGGLE_SHOW_SUBSTITUTES, TOGGLE_SEASONAL_RECIPES,
    HANDLE_INGREDIENTS_MANAGEMENT, TOGGLE_FOOD_LISTS_INDEPENDENCE } from '../actions/types'
import { AsyncStorage } from "react-native"

const initialState = {
    savedRecipes: undefined,
    shoppingList: undefined,
    fridge: undefined,
    recipesDetails: {}
}

export const generalReducer = function(state = initialState, action) {
    let recipesDetails = state.recipesDetails

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
        case FETCH_RECIPES_DETAILS_PENDING:
            for(const recipeID of action.recipesIDs) {
                recipesDetails[recipeID] = null
            }
            return {
                ...state,
                recipesDetails: recipesDetails
            }
        case FETCH_RECIPES_DETAILS_SUCCESS:
            for(const recipe of action.recipesDetails) {
                recipesDetails[recipe._id] = recipe
            }
            AsyncStorage.setItem('recipesDetails', JSON.stringify(recipesDetails))
            return {
                ...state,
                recipesDetails: {...recipesDetails}
            }
        case LOAD_RECIPES_DETAILS:
            return {
                ...state,
                recipesDetails: action.recipesDetails
            }
        case REMOVE_RECIPES_DETAILS:
            for(const recipeID of action.recipesIDs) {
                if(recipesDetails.hasOwnProperty(recipeID)) { delete recipesDetails[recipeID] }
            }
            AsyncStorage.setItem('recipesDetails', JSON.stringify(recipesDetails))
            return {
                ...state,
                recipesDetails: {...recipesDetails}
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

const initialUserSettings = {
    seasonalRecipes: true,
    showSubstitutes: true,
    shoppingListManagement: 'ALWAYS_ASK',
    switchValueAutomaticFilling: true
}

export const settingsReducer = function(state = initialUserSettings, action) {
    switch(action.type) {
        case TOGGLE_SHOW_SUBSTITUTES:
            AsyncStorage.setItem('settings', JSON.stringify({...state, showSubstitutes: action.value}))
            return {
                ...state,
                showSubstitutes: action.value
            }
        case TOGGLE_SEASONAL_RECIPES:
            AsyncStorage.setItem('settings', JSON.stringify({...state, seasonalRecipes: action.value}))
            return {
                ...state,
                seasonalRecipes: action.value
            }
        case HANDLE_INGREDIENTS_MANAGEMENT:
            AsyncStorage.setItem('settings', JSON.stringify({...state, shoppingListManagement: action.value}))
            return {
                ...state,
                shoppingListManagement: action.value
            }
        case TOGGLE_FOOD_LISTS_INDEPENDENCE:
            AsyncStorage.setItem('settings', JSON.stringify({...state, switchValueAutomaticFilling: action.value}))
            return {
                ...state,
                switchValueAutomaticFilling: action.value
            }
        default:
            return state
    }
}