import { combineReducers, createStore } from 'redux'

import { generalReducer } from './reducers'

const AppReducers = combineReducers({ generalReducer })

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}

export default createStore(rootReducer)