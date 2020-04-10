import { Toast } from 'native-base'
import Constants from "../../constants/Constants"

export const getAllIngredients = async function() {
    return fetch(`${Constants.apiEndpoint}/public/ingredients`)
        .then((response) => {
            return response.json()
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return []
        })
}

export const getProductsByIngredient = async function(ingredientID) {
    return fetch(`${Constants.apiEndpoint}/public/products/by/ingredient/${ingredientID}`)
        .then((response) => {
            return response.json()
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return []
        })
}

export const getRecipeFromId = async function(recipeID) {
    return fetch(`${Constants.apiEndpoint}/public/recipe/${recipeID}`)
        .then((response) => {
            return response.json()
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return null
        })
}

export const getMostFamousRecipesSummary = async function() {
    return fetch(`${Constants.apiEndpoint}/public/recipes/by/fame`)
        .then((response) => {
            return response.json()
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return []
        })
}

export const getMostFamousSeasonalRecipesSummary = async function() {
    return fetch(`${Constants.apiEndpoint}/public/seasonal/recipes/by/fame`)
        .then((response) => {
            return response.json()
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return []
        })
}

export const getRecipesSummaryFromKeywords = async function(keywords) {
    return fetch(`${Constants.apiEndpoint}/public/recipes/by/keywords`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: keywords,
            }),
        }).then((response) => {
            return response.json()
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return []
        })
}

export const getRecipesSummaryFromIngredients = async function(ingredientIDs) {
    return fetch(`${Constants.apiEndpoint}/public/recipes/by/ingredients`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients: ingredientIDs,
            }),
        }).then((response) => {
        return response.json()
    })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return []
        })
}

export const logInUser = async function(user, password) {
    return fetch(`${Constants.apiEndpoint}/public/login`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user,
                password: password
            }),
        }).then((response) => {
            return response.json()
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return {}
        })
}

export const signUpUser = async function(user, password) {
    return fetch(`${Constants.apiEndpoint}/public/register`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user,
                password: password
            }),
        }).then((response) => {
            const r = response.json()
            Toast.show({
                text: r.message,
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
        return true
        })
        .catch(() => {
            Toast.show({
                text: 'Un problème est survenu !',
                textStyle: { textAlign: 'center' },
                buttonText: 'Ok'
            })
            return false
        })
}
