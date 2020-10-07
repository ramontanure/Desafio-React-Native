import { createStore, combineReducers } from 'redux'

import userReducer from './reducers/user'
import cardapioReducer from './reducers/cardapio'


const reducers = combineReducers({ 
   user: userReducer,
   cardapio: cardapioReducer,
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig
