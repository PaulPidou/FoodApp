import { AsyncStorage } from 'react-native'
import { Toast } from 'native-base'

import { fetchSavedRecipes, fetchRecipesDetails, removeRecipesDetails,
    fetchShoppingList, fetchFridge } from '../actions/actions'
import Constants from "../../constants/Constants"

let userParamaters = {
    keepFoodListIndependent: false
}

export const getUserLists = async function() {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/lists`,
        {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + userToken, 'Content-Type': 'application/json' }
        }).then((response) => {
        return response.json()
    })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok',
                duration: 3000,
            })
            return null
        })
}

export const saveRecipes = async function(recipeIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/save/recipes`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipes: recipeIDs,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchSavedRecipes(userToken)
            fetchRecipesDetails(recipeIDs)
            if(!userParamaters.keepFoodListIndependent) {
                fetchShoppingList(userToken)
            }
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const deleteSavedRecipes = async function(recipeIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/savedrecipes/delete/recipes`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipes: recipeIDs,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchSavedRecipes(userToken)
            removeRecipesDetails(recipeIDs)
            if(!userParamaters.keepFoodListIndependent) {
                fetchShoppingList(userToken)
            }
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const cookSavedRecipes = async function(recipeIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/savedrecipes/cook/recipes`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipes: recipeIDs,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchSavedRecipes(userToken)
            fetchFridge(userToken)
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const upsertItemsToShoppingList = async function(items) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/shoppinglist/items`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: items,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchShoppingList(userToken)
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const upsertItemsToShoppingListFromRecipes = async function(recipeIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/shoppinglist/items/from/recipes`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipes: recipeIDs,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchShoppingList(userToken)
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const deleteItemsFromShoppingList = async function(itemIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/shoppinglist/delete/items`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: itemIDs,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchShoppingList(userToken)
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const transferItemsFromShoppingListToFridge = async function(itemIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/move/items/from/shoppinglist/to/fridge`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: itemIDs,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchShoppingList(userToken)
            fetchFridge(userToken)
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const upsertItemsToFridge = async function(items) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/fridge/items`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: items,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchFridge(userToken)
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const deleteItemsFromFridge = async function(itemIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/fridge/delete/items`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: itemIDs,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchFridge(userToken)
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}

export const transferItemsFromFridgeToShoppingList = async function(itemIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${Constants.apiEndpoint}/user/move/items/from/fridge/to/shoppinglist`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: itemIDs,
            }),
        }).then((response) => response.json())
        .then((responseJSON) => {
            Toast.show({
                text: responseJSON.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            fetchShoppingList(userToken)
            fetchFridge(userToken)
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
}