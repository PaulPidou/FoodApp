
export const getRecipesSummary = async function() {
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
}

export const getShoppingList = async function() {
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
}

export const getFirdge = async function() {
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
}