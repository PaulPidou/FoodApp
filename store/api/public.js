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
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpZG91LnBhdWxAZ21haWwuY29tIiwiaWF0IjoxNTQ0ODk1NTM2fQ.US2s6kEKmEuhO_LIsH_vPAfEYBN-36_PUbY4sKKjalY'
}

export const signUpUser = async function(user, password) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'abc'
}
