import { AuthState } from './auth.state';
import * as AuthActions from './auth.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultAuthState: AuthState = {
  loginInfo: null,
  wrongCredentials: null,
  loading: false,
};

const _authReducer = createReducer(defaultAuthState,

  /* login */
  on(AuthActions.AuthLogin, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* login success */
  on(AuthActions.AuthLoginSuccess, (state, { loginInfo }) => {
    return {
      ...state,
      loginInfo: loginInfo,
      wrongCredentials: false,
      loading: false
    }
  }),

  /* login error */
  on(AuthActions.AuthLoginError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loginInfo: null,
      wrongCredentials: true,
      loading: false
    }
  }),

  /* logout */
  on(AuthActions.AuthLogout, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* logout success */
  on(AuthActions.AuthLogoutSuccess, state => {
    return {
      ...state,
      loginInfo: null,
      wrongCredentials: null,
      loading: false
    }
  }),

  /* logout error */
  on(AuthActions.AuthLogoutError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  // /* register */
  // on(AuthActions.UserRegister, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* register success */
  // on(AuthActions.UserRegisterSuccess, (state, { user }) => {
  //   console.log('reducer register', user)
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* register error */
  // on(AuthActions.UserRegisterError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),


);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
