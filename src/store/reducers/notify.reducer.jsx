import { actionTypes } from "../actions/notify.action";

const initialState = {
    open: false,
    horizontal: 'left',
    vertical: 'bottom',
    class: 'success',
    time: 3000,
    msg: 'Dados Atualizados.'
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case actionTypes.CHANGE:
    return { ...state, ...payload }

  default:
    return state
  }
}
