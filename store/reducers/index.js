import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import serviceReducer from './reducers'

const AppReducers = combineReducers({
    serviceReducer,
})

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}

export default createStore(rootReducer, applyMiddleware(thunk))