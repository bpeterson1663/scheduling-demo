import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer'
import thunk from 'redux-thunk'

const middleWare = [thunk]

export const store = createStore(rootReducer, applyMiddleware(...middleWare))
