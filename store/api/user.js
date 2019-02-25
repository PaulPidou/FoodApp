import { AsyncStorage } from 'react-native'
import { Toast } from 'native-base'
const api_ip = "http://192.168.43.163:3000/api"

export const getSavedRecipesSummary = async function() {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/savedrecipes`,
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
            return []
        })

    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
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
    */
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

export const getShoppingList = async function() {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/shoppinglist`,
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
            return []
        })
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
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

export const getFridge = async function() {
    const userToken = await AsyncStorage.getItem('userToken')
    return fetch(`${api_ip}/user/fridge`,
        {
            method: 'get',
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
            return []
        })
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        {
            _id: 123,
            ingredientID: 123,
            ingredientName: 'abricot',
            quantity: 5,
            expirationDate: 1546985657000
        },
        {
            _id: 456,
            ingredientID: 456,
            ingredientName: 'lait',
            quantity: 500,
            unit: 'ml',
        }
    ]
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