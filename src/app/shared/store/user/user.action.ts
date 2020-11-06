import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Language } from '@models/language.model';

export enum UserActionTypes {
  USER_LOGIN = '[User/Auth] USER_LOGIN',
  USER_LOGIN_SUCCESS = '[User/Auth] USER_LOGIN_SUCCESS',
  USER_LOGIN_ERROR = '[User/Auth] USER_LOGIN_ERROR',

  USER_LOGOUT = '[User/Auth] USER_LOGOUT',
  USER_LOGOUT_SUCCESS = '[User/Auth] USER_LOGOUT_SUCCESS',
  USER_LOGOUT_ERROR = '[User/Auth] USER_LOGOUT_ERROR',

  USER_REGISTER = '[User/Auth] USER_REGISTER',
  USER_REGISTER_SUCCESS = '[User/Auth] USER_REGISTER_SUCCESS',
  USER_REGISTER_ERROR = '[User/Auth] USER_REGISTER_ERROR',

  USER_UPDATE_PERSONAL_DATA = '[User/Profile] USER_UPDATE_PERSONAL_DATA',
  USER_UPDATE_PERSONAL_DATA_SUCCESS = '[User/Profile] USER_UPDATE_PERSONAL_DATA_SUCCESS',
  USER_UPDATE_PERSONAL_DATA_ERROR = '[User/Profile] USER_UPDATE_PERSONAL_DATA_ERROR',

  USER_CREATE_LANGUAGE = '[User/Language] USER_CREATE_LANGUAGE_DATA',
  USER_CREATE_LANGUAGE_SUCCESS = '[User/Language] USER_CREATE_LANGUAGE_SUCCESS',
  USER_CREATE_LANGUAGE_ERROR = '[User/Language] USER_CREATE_LANGUAGE_ERROR',

  USER_UPDATE_LANGUAGE = '[User/Language] USER_UPDATE_LANGUAGE',
  USER_UPDATE_LANGUAGE_SUCCESS = '[User/Language] USER_UPDATE_LANGUAGE_SUCCESS',
  USER_UPDATE_LANGUAGE_ERROR = '[User/Language] USER_UPDATE_LANGUAGE_ERROR',

  USER_DELETE_LANGUAGE = '[User/Language] USER_DELETE_LANGUAGE',
  USER_DELETE_LANGUAGE_SUCCESS = '[User/Language] USER_DELETE_LANGUAGE_SUCCESS',
  USER_DELETE_LANGUAGE_ERROR = '[User/Language] USER_DELETE_LANGUAGE_ERROR',
}

/* auth login */
export const UserLogin = createAction(UserActionTypes.USER_LOGIN, props<{ loginInfo: Login }>());
export const UserLoginSuccess = createAction(UserActionTypes.USER_LOGIN_SUCCESS, props<{ user: User }>());
export const UserLoginError = createAction(UserActionTypes.USER_LOGIN_ERROR, props<{ err: String }>());

/* auth logout */
export const UserLogout = createAction(UserActionTypes.USER_LOGOUT, props<{ user: User }>());
export const UserLogoutSuccess = createAction(UserActionTypes.USER_LOGOUT_SUCCESS);
export const UserLogoutError = createAction(UserActionTypes.USER_LOGOUT_ERROR, props<{ err: String }>());

/* auth register */
export const UserRegister = createAction(UserActionTypes.USER_REGISTER, props<{ user: User }>());
export const UserRegisterSuccess = createAction(UserActionTypes.USER_REGISTER_SUCCESS, props<{ user: User }>());
export const UserRegisterError = createAction(UserActionTypes.USER_REGISTER_ERROR, props<{ err: String }>());

/* user update profile */
export const UserUpdatePersonalData = createAction(UserActionTypes.USER_UPDATE_PERSONAL_DATA, props<{ user: User }>());
export const UserUpdatePersonalDataSuccess = createAction(UserActionTypes.USER_UPDATE_PERSONAL_DATA_SUCCESS, props<{ user: User }>());
export const UserUpdatePersonalDataError = createAction(UserActionTypes.USER_UPDATE_PERSONAL_DATA_ERROR, props<{ err: String }>());

/* create language */
export const UserCreateLanguage = createAction(UserActionTypes.USER_CREATE_LANGUAGE, props<{ user: User }>());
export const UserCreateLanguageSuccess = createAction(UserActionTypes.USER_CREATE_LANGUAGE_SUCCESS);
export const UserCreateLanguageError = createAction(UserActionTypes.USER_CREATE_LANGUAGE_ERROR, props<{ err: String }>());

/* update language */
export const UserUpdateLanguage = createAction(UserActionTypes.USER_UPDATE_LANGUAGE, props<{ user: User }>());
export const UserUpdateLanguageSuccess = createAction(UserActionTypes.USER_UPDATE_LANGUAGE_SUCCESS, props<{ user: User }>());
export const UserUpdateLanguageError = createAction(UserActionTypes.USER_UPDATE_LANGUAGE_ERROR, props<{ err: String }>());

/* delete language */
export const UserDeleteLanguage = createAction(UserActionTypes.USER_DELETE_LANGUAGE, props<{ user: User, language: Language }>());
export const UserDeleteLanguageSuccess = createAction(UserActionTypes.USER_DELETE_LANGUAGE_SUCCESS, props<{ user: User }>());
export const UserDeleteLanguageError = createAction(UserActionTypes.USER_DELETE_LANGUAGE_ERROR, props<{ err: String }>());