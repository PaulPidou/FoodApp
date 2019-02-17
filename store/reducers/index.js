import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { savedRecipesReducer, getAllIngredientsReducer } from './reducers'

const AppReducers = combineReducers({
    savedRecipesReducer,
    getAllIngredientsReducer
})

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}

export default createStore(rootReducer, applyMiddleware(thunk))