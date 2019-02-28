import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { generalReducer, savedRecipesReducer } from './reducers'

const AppReducers = combineReducers({
    generalReducer
})

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}

export default createStore(rootReducer, applyMiddleware(thunk))