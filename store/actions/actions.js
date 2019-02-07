import { ADD_RECIPES } from './types'

export const addRecipes = function(recipes) {
    return {
        type: ADD_RECIPES,
        payload: recipes
    }
}