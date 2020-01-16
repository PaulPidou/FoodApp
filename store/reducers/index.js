import { combineReducers, applyMiddleware, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native'

import { generalReducer } from './reducers'

const AppReducers = combineReducers({ generalReducer })

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default createStore(persistedReducer, applyMiddleware(thunk))