import { Http } from "../../config/Http"
import { changeLoading } from "./loading.action"
import { changeNotify } from './notify.action'

export const actionTypes = {
    CHANGE: 'OAUTH_CHANGE',
    SUCCESS: 'OAUTH_SUCCESS'
}

export const changeOauth = (payload) => ({
  type: actionTypes.CHANGE,
  payload
})

export const oauthSuccess = (payload) => ({
  type: actionTypes.SUCCESS,
  payload
})

export const setUserToken = token => dispatch => {
  localStorage.setItem('access_token', token)

  dispatch(changeOauth({
    email: '',
    password: ''
  }))

  dispatch(oauthSuccess(true))
}

export const login = credentials => dispatch => {
  dispatch(changeLoading({
    open: true,
    msg: 'Autenticando usuário...'
  }))

  return Http.post('/oauth/token', {
    'grant_type': 'password',
    'client_id': 2,
    'client_secret': '8xaWCC0P7DPw2E3wSrkZppQNajAXi1XnbjRDiOQB',
    'username': credentials.email,
    'password': credentials.password
  })
  .then(res => {
    dispatch(changeLoading({open: false}))

    if(typeof res !== 'undefined') {
      if(res.data.access_token) {
        dispatch(setUserToken(res.data.access_token))
      }
    }
  })
  .catch(error => {
    dispatch(changeLoading({open: false}))

    if(typeof error.response !== 'undefined') {
      if(error.response.status === 401 || error.response.status === 400) {
        dispatch(changeNotify({
          open: true,
          class: 'error',
          msg: 'E-mail ou senha incorretos'
        }))
      }
    } else {
      dispatch(changeNotify({
        open: true,
        class: 'error',
        msg: 'Erro ao conectar ao servidor'
      }))
    }
  })
}