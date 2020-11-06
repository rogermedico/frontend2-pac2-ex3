import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './user.action';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Language } from '@models/language.model';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private us: UserService) { }

  /* login */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_LOGIN),
    mergeMap((action: { type: string, loginInfo: Login }) => this.us.login(action.loginInfo).pipe(
      map(user => {
        return { type: UserActions.UserActionTypes.USER_LOGIN_SUCCESS, user: user }
      }),
      catchError(err => of({ type: UserActions.UserActionTypes.USER_LOGIN_ERROR, err: err }))
    ))
  ));

  /* logout */
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_LOGOUT),
    mergeMap((action: { type: string, user: User }) => this.us.logout(action.user).pipe(
      map(user => {
        return { type: UserActions.UserActionTypes.USER_LOGOUT_SUCCESS }
      }),
      catchError(err => of({ type: UserActions.UserActionTypes.USER_LOGOUT_ERROR, err: err }))
    ))
  ));

  /* register */
  register$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_REGISTER),
    mergeMap((action: { type: string, user: User }) => this.us.register(action.user).pipe(
      map(user => {
        return { type: UserActions.UserActionTypes.USER_REGISTER_SUCCESS, user: user }
      }),
      catchError(err => of({ type: UserActions.UserActionTypes.USER_REGISTER_ERROR, err: err }))
    ))
  ));

  /* update personal data */
  updatePersonalData$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA),
    mergeMap((action: { type: string, user: User }) => this.us.updateUser(action.user).pipe(
      map(() => {
        return { type: UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA_SUCCESS, user: action.user }
      }),
      catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA_ERROR, err: err }))
    ))
  ));

  /* create language */
  createLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_CREATE_LANGUAGE),
    mergeMap((action: { type: string, user: User, language: Language }) => {
      const updatedUser = { ...action.user, languages: [...action.user.languages, action.language] };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_ERROR, err: err }))
      )
    })
  ));

  /* update language */
  updateLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_LANGUAGE),
    mergeMap((action: { type: string, user: User, oldLanguage: Language, newLanguage: Language }) => {
      const updatedUser = {
        ...action.user,
        languages: action.user.languages.map(l => {
          if (l === action.oldLanguage) return action.newLanguage;
          else return l;
        })
      };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_ERROR, err: err }))
      )
    })
  ));

  /* delete language */
  deleteLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_DELETE_LANGUAGE),
    mergeMap((action: { type: string, user: User, language: Language }) => {
      const updatedUser = { ...action.user, languages: action.user.languages.filter(lang => lang !== action.language) };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_ERROR, err: err }))
      )
    })
  ));
}