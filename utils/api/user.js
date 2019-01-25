
export const getSavedRecipesSummary = async function() {
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

export const saveRecipes = async function(recipeIDs) {

}

export const deleteSavedRecipes = async function(recipesIDs) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
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

export const upsertItemsToShoppingList = async function(items) {

}

export const upsertItemsToShoppingListFromRecipes = async function(recipeIDs) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
}

export const deleteItemsFromShoppingList = async function(itemIDs) {

}

export const transferItemsFromShoppingListToFridge = async function(itemIDs) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
}

export const getFridge = async function() {
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

export const upsertItemsToFridge = async function(items) {

}

export const deleteItemsFromFridge = async function(itemIDs) {

}

export const transferItemsFromFridgeToShoppingList = async function(itemIDs) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return false
}