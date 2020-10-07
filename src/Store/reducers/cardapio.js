import { ADD_CARDAPIO } from '../actions/actionsTypes';

const initialState = {
  cardapio: null,
}

const reducer = (state = initialState, action) => {
  console.log(action ? action : 'Sem action');
  switch (action.type) {
    case ADD_CARDAPIO:
      return {
        ...state,
        cardapio: action.payload.cardapio,
      }

    default:
      return state;
  }
}

export default reducer;