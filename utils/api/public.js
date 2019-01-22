const api_ip = "192.168.43.163:3000"

export const getAllIngredients = async function() {
    return [
        'abricot',
        'beurre',
        'farine',
        'salade',
        'saumon',
        'thon',
        'tortilla'
    ]
}

export const getRecipeFromId = async function(recipeID) {
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
}

export const getRecipesSummaryFromKeywords = async function(keywords) {
    /*return await fetch('http://' + api_ip + '/api/public/recipes/by/keywords',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: keywords,
            }),
        });
        */
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
}

export const getRecipesSummaryFromIngredients = async function(ingredientIDs) {

}

export const logInUser = async function(user, password) {

}

export const signUpUser = async function(user, password) {

}
