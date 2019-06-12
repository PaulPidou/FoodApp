import { Toast } from 'native-base'
//const api_ip = "http://192.168.43.163:3000/api"
const api_ip = "http://192.168.1.27:3000/api"

export const getAllIngredients = async function() {
    return fetch(`${api_ip}/public/ingredients`)
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

    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        { "_id": "123", "name": 'abricot' },
        { "_id": "234", "name": 'beurre' },
        { "_id": "345", "name": 'farine' },
        { "_id": "456", "name": 'salade' },
        { "_id": "567", "name": 'saumon' },
        { "_id": "678", "name": 'thon' },
        { "_id": "789", "name": 'tortilla' },
    ]
    */
}

export const getRecipeFromId = async function(recipeID) {
    return fetch(`${api_ip}/public/recipe/${recipeID}`)
        .then((response) => {
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
        "_id": 123,
        "title": '\xab Tartilla \xbb aux abricots',
        "author": 'Old El Paso',
        "budget": "bon marché",
        "difficulty": "facile",
        "recipeQuantity": {
            "unit": "personnes",
            "value": 4
        },
        "fame": 154,
        "picture": "string",
        "ingredients": [
            {
                "ingredientID": "123",
                "display": "10 g de beurre fondu",
                "ingredient": "beurre",
                "quantity": 10,
                "unit": "g",
                "complement": "fondu",
                "picture": "string"
            },
            {
                "ingredientID": "456",
                "display": "6 abricot",
                "ingredient": "abricot",
                "quantity": 6,
                "unit": "",
                "complement": "",
                "picture": "string"
            }
        ],
        "utensils": [
            {
                "utensil": "1 four",
                "picture": "string"
            },
            {
                "utensil": "1 pinceau",
                "picture": "string"
            }
        ],
        "recipe": [
            'Préchauffer le four à 180 °C.',
            "Disposer la tortilla sur une plaque couverte de papier sulfurisé. La badigeonner avec le beurre fondu à l'aide d'un pinceau ou des mains. Saupoudrer avec 1 sachet de sucre vanillé. Enfourner pour 8 à 10 minutes en surveillant attentivement : les contours de la tortilla doivent commencer à dorer.",
            'Pendant de temps, dénoyauter les abricots et les couper en lamelles.',
            "Sortir la tortilla du four. Répartir harmonieusement les lamelles d'abricots sur la tortilla. Saupoudrer avec l'autre sachet de sucre vanillé. Enfourner pour 10 minutes supplémentaires."
        ],
        "tags": [
            "petit budget", "famille"
        ],
        "totalTime": 50,
        "timingDetails": {
            "preparation": 20,
            "cooking": 30,
            "rest": 0
        }
    }
    */
}

export const getRecipesSummaryFromKeywords = async function(keywords) {
    return fetch(`${api_ip}/public/recipes/by/keywords`,
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
     /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        {
            _id : '123',
            title: 'Super recipe 1: fjdj jdjdjd djdjdj djdjdjd',
            budget: 'bon marché',
            difficulty: 'facile',
            totalTime: '50'
        },
        {
            _id : '424',
            title: 'Super recipe 2',
            budget: 'assez cher',
            difficulty: 'difficile',
            totalTime: '80'
        }
    ]
    */
}

export const getRecipesSummaryFromIngredients = async function(ingredientIDs) {
    return fetch(`${api_ip}/public/recipes/by/ingredients`,
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
    /*
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        {
            _id : '123',
            title: 'Super recipe 1: found thanks to ingredients',
            budget: 'bon marché',
            difficulty: 'facile',
            totalTime: '50'
        },
        {
            _id : '424',
            title: 'Super recipe 2',
            budget: 'assez cher',
            difficulty: 'difficile',
            totalTime: '80'
        }
    ]
    */
}

export const logInUser = async function(user, password) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpZG91LnBhdWxAZ21haWwuY29tIiwiaWF0IjoxNTQ0ODk1NTM2fQ.US2s6kEKmEuhO_LIsH_vPAfEYBN-36_PUbY4sKKjalY'
}

export const signUpUser = async function(user, password) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'abc'
}
