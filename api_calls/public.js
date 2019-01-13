const api_ip = "192.168.43.163:3000"

export const getRecipeFromId = async function(id) {
    return {

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
            title: 'Super recipe 1',
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