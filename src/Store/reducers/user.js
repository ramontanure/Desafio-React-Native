import { USER_LOGGED_IN, CARDAPIO } from '../actions/actionsTypes'

const initialState = {
    name: null,
    email: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGGED_IN:
        return {
            ...state,
            name: action.payload.name,
            email: action.payload.email
        } 
        case CARDAPIO: 
        return{
             ...state,
             name: action.payload.name,
             email: action.payload.email
        }
        default:
            return state
    }
}

export default reducer