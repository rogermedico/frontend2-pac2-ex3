import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';

export enum AuthActionTypes {
  USER_LOGIN = '[Auth] USER_LOGIN',
  USER_LOGIN_SUCCESS = '[Auth] USER_LOGIN_SUCCESS',
  USER_LOGIN_ERROR = '[Auth] USER_LOGIN_ERROR',

  USER_LOGOUT = '[Auth] USER_LOGOUT',
  USER_LOGOUT_SUCCESS = '[Auth] USER_LOGOUT_SUCCESS',
  USER_LOGOUT_ERROR = '[Auth] USER_LOGOUT_ERROR',

  USER_REGISTER = '[Auth] USER_REGISTER',
  USER_REGISTER_SUCCESS = '[Auth] USER_REGISTER_SUCCESS',
  USER_REGISTER_ERROR = '[Auth] USER_REGISTER_ERROR',
}

/* user login */
export const UserLogin = createAction(AuthActionTypes.USER_LOGIN, props<{ loginInfo: Login }>());
export const UserLoginSuccess = createAction(AuthActionTypes.USER_LOGIN_SUCCESS, props<{ user: User }>());
export const UserLoginError = createAction(AuthActionTypes.USER_LOGIN_ERROR, props<{ err: String }>());

/* user logout */
export const UserLogout = createAction(AuthActionTypes.USER_LOGOUT, props<{ user: User }>());
export const UserLogoutSuccess = createAction(AuthActionTypes.USER_LOGOUT_SUCCESS);
export const UserLogoutError = createAction(AuthActionTypes.USER_LOGOUT_ERROR, props<{ err: String }>());

/* user register */
export const UserRegister = createAction(AuthActionTypes.USER_REGISTER, props<{ user: User }>());
export const UserRegisterSuccess = createAction(AuthActionTypes.USER_REGISTER_SUCCESS, props<{ user: User }>());
export const UserRegisterError = createAction(AuthActionTypes.USER_REGISTER_ERROR, props<{ err: String }>());