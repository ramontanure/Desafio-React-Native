import { ADD_CARDAPIO } from './actionsTypes'

export const getCardapio = cardapio => {
    return {
        type: ADD_CARDAPIO,
        payload: cardapio
    }
}