import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.action';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';
import { stringify } from 'querystring';
import { Login } from '@models/login.model';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private us: UserService) { }

  /* login */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.USER_LOGIN),
    mergeMap((action: { type: string, loginInfo: Login }) => this.us.login(action.loginInfo).pipe(
      map(user => {
        console.log('return of login in effect', user)
        return { type: AuthActions.AuthActionTypes.USER_LOGIN_SUCCESS, user: user }
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.USER_LOGIN_ERROR, err: err }))
    ))
  ));

  /* logout */
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.USER_LOGOUT),
    mergeMap((action: { type: string, user: User }) => this.us.logout(action.user).pipe(
      map(user => {
        console.log('return of logout in effect', user)
        return { type: AuthActions.AuthActionTypes.USER_LOGOUT_SUCCESS }
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.USER_LOGOUT_ERROR, err: err }))
    ))
  ));

  /* register */
  register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.USER_REGISTER),
    mergeMap((action: { type: string, user: User }) => this.us.register(action.user).pipe(
      map(user => {
        console.log('effect register', user)
        return { type: AuthActions.AuthActionTypes.USER_REGISTER_SUCCESS, user: user }
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.USER_REGISTER_ERROR, err: err }))
    ))
  ));

  // /* update todo */
  // updateTodo$ = createEffect(() => this.actions$.pipe(
  //   ofType(TodoActions.TodoActionTypes.UPDATE_TODO),
  //   mergeMap((action: { type: string, todo: Todo }) => this.ts.editTodo(action.todo).pipe(
  //     map(() => {
  //       return { type: TodoActions.TodoActionTypes.UPDATE_TODO_SUCCESS, todo: action.todo }
  //     }),
  //     catchError(() => of({ type: TodoActions.TodoActionTypes.UPDATE_TODO_ERROR }))
  //   ))
  // ));

  // /* delete todo effect */
  // deleteTodo$ = createEffect(() => this.actions$.pipe(
  //   ofType(TodoActions.TodoActionTypes.DELETE_TODO),
  //   mergeMap((action: { type: string, id: number }) => this.ts.deleteTodo(action.id).pipe(
  //     map(() => {
  //       return { type: TodoActions.TodoActionTypes.DELETE_TODO_SUCCESS, id: action.id }
  //     }),
  //     catchError(() => of({ type: TodoActions.TodoActionTypes.DELETE_TODO_ERROR }))
  //   ))
  // ));

  // /* toggle status todo */
  // statusToggleTodo$ = createEffect(() => this.actions$.pipe(
  //   ofType(TodoActions.TodoActionTypes.STATUS_TOGGLE_TODO),
  //   mergeMap((action: { type: string, todo: Todo }) => this.ts.editTodo({ ...action.todo, status: !action.todo.status }).pipe(
  //     map(() => {
  //       return { type: TodoActions.TodoActionTypes.STATUS_TOGGLE_TODO_SUCCESS, todo: { ...action.todo, status: !action.todo.status } }
  //     }),
  //     catchError(() => of({ type: TodoActions.TodoActionTypes.STATUS_TOGGLE_TODO_ERROR }))
  //   ))
  // ));

}