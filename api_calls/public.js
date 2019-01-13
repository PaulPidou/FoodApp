const api_ip = "192.168.43.163:3000"

export const getRecipeFromId = async function(id) {
    return {
        "_id": 123,
        "title": "Super recipe 1",
        "author": "Toto",
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
                "display": "string",
                "ingredient": "string",
                "quantity": 0,
                "unit": "string",
                "complement": "string",
                "picture": "string"
            },
            {
                "display": "string",
                "ingredient": "string",
                "quantity": 0,
                "unit": "string",
                "complement": "string",
                "picture": "string"
            }
        ],
        "utensils": [
            {
                "utensil": "string",
                "picture": "string"
            },
            {
                "utensil": "string",
                "picture": "string"
            }
        ],
        "recipe": [
            "Etape1",
            "Etape2",
            "Etape3"
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

export const getRecipesFromKeywords = async function(keywords) {
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