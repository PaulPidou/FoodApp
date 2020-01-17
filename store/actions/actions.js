import { Toast } from 'native-base'
import { FETCH_RECIPES_PENDING, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_ERROR,
    FETCH_RECIPES_DETAILS_PENDING, FETCH_RECIPES_DETAILS_SUCCESS, LOAD_RECIPES_DETAILS, REMOVE_RECIPES_DETAILS,
    FETCH_SHOPPINGLIST_PENDING, FETCH_SHOPPINGLIST_SUCCESS, FETCH_SHOPPINGLIST_ERROR,
    FETCH_FRIDGE_PENDING, FETCH_FRIDGE_SUCCESS, FETCH_FRIDGE_ERROR } from './types'
import store from '../reducers/index'
import { AsyncStorage } from "react-native"

const api_ip = 'http://192.168.43.163:3000/api'

export const fetchSavedRecipes = function(userToken) {
    store.dispatch({ type: FETCH_RECIPES_PENDING })

    fetch(`${api_ip}/user/savedrecipes`, {
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

    fetch(`${api_ip}/public/recipes/details`, {
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

    fetch(`${api_ip}/user/shoppinglist`, {
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

    fetch(`${api_ip}/user/fridge`, {
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