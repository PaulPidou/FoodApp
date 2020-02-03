import { combineReducers, createStore } from 'redux'

import { generalReducer, settingsReducer } from './reducers'

const AppReducers = combineReducers({ generalReducer, settingsReducer })

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}

export default createStore(rootReducer)