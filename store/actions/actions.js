import { Toast } from 'native-base'
import { FETCH_RECIPES_PENDING, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_ERROR,
    FETCH_RECIPES_DETAILS_PENDING, FETCH_RECIPES_DETAILS_SUCCESS, LOAD_RECIPES_DETAILS, REMOVE_RECIPES_DETAILS,
    FETCH_SHOPPINGLIST_PENDING, FETCH_SHOPPINGLIST_SUCCESS, FETCH_SHOPPINGLIST_ERROR,
    FETCH_FRIDGE_PENDING, FETCH_FRIDGE_SUCCESS, FETCH_FRIDGE_ERROR, TOGGLE_SHOW_SUBSTITUTES } from './types'
import { AsyncStorage } from "react-native"
import store from '../reducers/index'
import Constants from "../../constants/Constants"


export const fetchSavedRecipes = function(userToken) {
    store.dispatch({ type: FETCH_RECIPES_PENDING })

    fetch(`${Constants.apiEndpoint}/user/savedrecipes`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + userToken, 'Content-Type': 'application/json' }
    }).then((response) => response.json())
        .then((responseJSON) => {
        store.dispatch({
            type: FETCH_RECIPES_SUCCESS,
            savedRecipes: responseJSON
        })
    }).catch(() => {
        Toast.show({
            text: 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok',
            duration: 3000,
        })
        store.dispatch({ type: FETCH_RECIPES_ERROR })
    })
}

export const fetchRecipesDetails = function(recipeIDs) {
    store.dispatch({ type: FETCH_RECIPES_DETAILS_PENDING, recipesIDs: recipeIDs })

    fetch(`${Constants.apiEndpoint}/public/recipes/details`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recipes: recipeIDs,
        }),
    }).then((response) => response.json())
        .then((responseJSON) => {
            store.dispatch({
                type: FETCH_RECIPES_DETAILS_SUCCESS,
                recipesDetails: responseJSON
            })
        }).catch(() => {
        Toast.show({
            text: 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok',
            duration: 3000,
        })
        store.dispatch({ type: REMOVE_RECIPES_DETAILS, recipesIDs: recipeIDs })
    })
}

export const loadRecipesDetails = async function() {
    const recipesDetailsStored = await AsyncStorage.getItem('recipesDetails')
    const recipesDetails = recipesDetailsStored ? JSON.parse(recipesDetailsStored) : {}
    store.dispatch({ type: LOAD_RECIPES_DETAILS, recipesDetails: recipesDetails })
}

export const removeRecipesDetails = function(recipeIDs) {
    store.dispatch({ type: REMOVE_RECIPES_DETAILS, recipesIDs: recipeIDs })
}

export const fetchShoppingList = function(userToken) {
    store.dispatch({ type: FETCH_SHOPPINGLIST_PENDING })

    fetch(`${Constants.apiEndpoint}/user/shoppinglist`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + userToken, 'Content-Type': 'application/json' }
    }).then((response) => response.json())
        .then((responseJSON) => {
            store.dispatch({
                type: FETCH_SHOPPINGLIST_SUCCESS,
                shoppingList: responseJSON
            })
        }).catch(() => {
        Toast.show({
            text: 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok',
            duration: 3000,
        })
        store.dispatch({ type: FETCH_SHOPPINGLIST_ERROR })
    })
}

export const fetchFridge = function(userToken) {
    store.dispatch({ type: FETCH_FRIDGE_PENDING })

    fetch(`${Constants.apiEndpoint}/user/fridge`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + userToken, 'Content-Type': 'application/json' }
    }).then((response) => response.json())
        .then((responseJSON) => {
            store.dispatch({
                type: FETCH_FRIDGE_SUCCESS,
                fridge: responseJSON
            })
        }).catch(() => {
        Toast.show({
            text: 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok',
            duration: 3000,
        })
        store.dispatch({ type: FETCH_FRIDGE_ERROR })
    })
}

export const toggleShowSubstitutes = function(value) {
    store.dispatch({ type: TOGGLE_SHOW_SUBSTITUTES, value: value })
}