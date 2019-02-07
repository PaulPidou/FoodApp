import {ADD_RECIPES, REMOVE_RECIPES} from '../actions/types'

const initialState = {
    savedRecipes: []
}

const savedRecipesReducer = function(state = initialState, action) {
    switch(action.type) {
        case ADD_RECIPES:
            return {
                ...state,
            }
        case REMOVE_RECIPES:
            return {
                ...state,
            }
        default:
            return state
    }

}

export default savedRecipesReducer