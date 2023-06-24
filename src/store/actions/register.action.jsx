import { Http } from "../../config/Http"
import { changeLoading } from "./loading.action"
import { changeNotify } from "./notify.action"

export const actionTypes = {
    CHANGE: 'REGISTER_CHANGE',
    ERROR: 'REGISTER_ERROR',
    SUCCESS: 'REGISTER_SUCCESS'
}

export const changeRegister = (payload) => ({
  type: actionTypes.CHANGE,
  payload
})

export const errors = (payload) => ({
  type: actionTypes.ERROR,
  payload
})

export const success = (payload) => ({
  type: actionTypes.SUCCESS,
  payload
})

export const setUserToken = token => dispatch => {
  localStorage.setItem('access_token', token);

  dispatch( changeRegister({
    name: '',
    email: '',
    password: ''
  }))

  dispatch(success(true))
}

export const register = data => dispatch => {
  dispatch(changeLoading({
    open: true,
    msg: 'Cadastrando usuário...'
  }))

  return Http.post('/register', data)
    .then(res => {
      dispatch(changeLoading({open: false}))
      
      if(typeof res !== 'undefined') {
        if(res.data.access_token) {
          dispatch(changeNotify({
            open: true,
            class: 'success',
            msg: 'Usuário cadastrado com sucesso.'
          }))

          dispatch(setUserToken(res.data.access_token))
        }
      }
    })
    .catch(error => {
      dispatch(changeLoading({open: false}))

      if(error.response) {
        dispatch(errors(error.response.data.errors))
      }
    })
}