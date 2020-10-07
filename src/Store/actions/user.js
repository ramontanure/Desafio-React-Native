import { USER_LOGGED_IN } from './actionsTypes'

export const login = user => {
    return { 
        type: USER_LOGGED_IN,
        payload: user
    } 
}

