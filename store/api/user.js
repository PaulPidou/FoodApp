import { AsyncStorage } from 'react-native'
import { Toast } from 'native-base'

import { fetchSavedRecipes, fetchShoppingList, fetchFridge } from '../actions/actions'
const api_ip = 'http://192.168.43.163:3000/api'

export const getUserLists = async function() {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/lists`,
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
            return {}
        })
}

export const saveRecipes = async function(recipeIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/save/recipes`,
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
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}

export const deleteSavedRecipes = async function(recipeIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/savedrecipes/delete/recipes`,
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
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        })
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}

export const upsertItemsToShoppingList = async function(items) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/shoppinglist/items`,
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}

export const upsertItemsToShoppingListFromRecipes = async function(recipeIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/shoppinglist/items/from/recipes`,
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}

export const deleteItemsFromShoppingList = async function(itemIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/shoppinglist/delete/items`,
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}

export const transferItemsFromShoppingListToFridge = async function(itemIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/move/items/from/shoppinglist/to/fridge`,
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}

export const upsertItemsToFridge = async function(items) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/fridge/items`,
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}

export const deleteItemsFromFridge = async function(itemIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/fridge/delete/items`,
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}

export const transferItemsFromFridgeToShoppingList = async function(itemIDs) {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/move/items/from/fridge/to/shoppinglist`,
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
    */
}