import { AuthState } from './auth.state';
import * as AuthActions from './auth.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultAuthState: AuthState = {
  user: null,
  loading: false,
};

const _authReducer = createReducer(defaultAuthState,

  /* login */
  on(AuthActions.UserLogin, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* login success */
  on(AuthActions.UserLoginSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* login error */
  on(AuthActions.UserLoginError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* logout */
  on(AuthActions.UserLogout, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* logout success */
  on(AuthActions.UserLogoutSuccess, state => {
    return {
      ...state,
      user: null,
      loading: false
    }
  }),

  /* logout error */
  on(AuthActions.UserLogoutError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* register */
  on(AuthActions.UserRegister, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* register success */
  on(AuthActions.UserRegisterSuccess, (state, { user }) => {
    console.log('reducer register', user)
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* register error */
  on(AuthActions.UserRegisterError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  })

);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
