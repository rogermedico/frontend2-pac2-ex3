import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as ActivityActions from './activity.action';
import { ActivitiesService } from '@services/activities.service';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';
import { stringify } from 'querystring';
import { Activity } from '@models/activity.model';

@Injectable()
export class ActivityEffects {

  constructor(private actions$: Actions, private as: ActivitiesService) { }

  /* load */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITIES_LOAD),
    mergeMap(() => this.as.getActivities().pipe(
      map(activities => {
        return { type: ActivityActions.ActivityActionTypes.ACTIVITIES_LOAD_SUCCESS, activities: activities }
      }),
      catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITIES_LOAD_ERROR, err: err }))
    ))
  ));

  /* select */
  select$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_SELECT),
    map((action: { type: string, activityId: number }) => {
      return { type: ActivityActions.ActivityActionTypes.ACTIVITY_SELECT_SUCCESS, activityId: action.activityId }
    }),
    catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_SELECT_ERROR, err: err }))
  ));

  /* create activity */
  createActivity$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_CREATE),
    mergeMap((action: { type: string, activity: Activity }) => {
      return this.as.createActivity(action.activity).pipe(
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_CREATE_SUCCESS, activity: action.activity }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_CREATE_ERROR, err: err }))
      )
    })
  ));

  /* update activity */
  updateActivity$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_UPDATE),
    mergeMap((action: { type: string, activity: Activity }) => {
      return this.as.updateActivity(action.activity).pipe(
        tap(a => console.log(a)),
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_UPDATE_SUCCESS, activity: action.activity }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_UPDATE_ERROR, err: err }))
      )
    })
  ));

  /* delete activity */
  deleteActivity$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_DELETE),
    mergeMap((action: { type: string, activityId: number }) => {
      return this.as.deleteActivity(action.activityId).pipe(
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_DELETE_SUCCESS, activityId: action.activityId }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_DELETE_ERROR, err: err }))
      )
    })
  ));

  /* signup */
  signup$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_SIGNUP),
    mergeMap((action: { type: string, activity: Activity, userId: number }) => {
      const newActivity = { ...action.activity, participatingUsers: [...action.activity.participatingUsers, action.userId] };
      return this.as.updateActivity(newActivity).pipe(
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_SIGNUP_SUCCESS, activity: newActivity }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_SIGNUP_ERROR, err: err }))
      )
    })
  ));

  /* signout */
  signout$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_SIGNOUT),
    mergeMap((action: { type: string, activity: Activity, userId: number }) => {
      const newActivity = { ...action.activity, participatingUsers: action.activity.participatingUsers.filter(userId => userId !== action.userId) };
      return this.as.updateActivity(newActivity).pipe(
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_SIGNOUT_SUCCESS, activity: newActivity }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_SIGNOUT_ERROR, err: err }))
      )
    })
  ));

  // /* register */
  // register$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_REGISTER),
  //   mergeMap((action: { type: string, user: User }) => this.us.register(action.user).pipe(
  //     map(user => {
  //       return { type: UserActions.UserActionTypes.USER_REGISTER_SUCCESS, user: user }
  //     }),
  //     catchError(err => of({ type: UserActions.UserActionTypes.USER_REGISTER_ERROR, err: err }))
  //   ))
  // ));

  // /* update personal data */
  // updatePersonalData$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA),
  //   mergeMap((action: { type: string, user: User }) => this.us.updateUser(action.user).pipe(
  //     map(() => {
  //       return { type: UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA_SUCCESS, user: action.user }
  //     }),
  //     catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA_ERROR, err: err }))
  //   ))
  // ));

  // /* create language */
  // createLanguage$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_CREATE_LANGUAGE),
  //   mergeMap((action: { type: string, user: User, language: Language }) => {
  //     const updatedUser = { ...action.user, languages: [...action.user.languages, action.language] };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* update language */
  // updateLanguage$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_UPDATE_LANGUAGE),
  //   mergeMap((action: { type: string, user: User, oldLanguage: Language, newLanguage: Language }) => {
  //     const updatedUser = {
  //       ...action.user,
  //       languages: action.user.languages.map(l => {
  //         if (l === action.oldLanguage) return action.newLanguage;
  //         else return l;
  //       })
  //     };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* delete language */
  // deleteLanguage$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_DELETE_LANGUAGE),
  //   mergeMap((action: { type: string, user: User, language: Language }) => {
  //     const updatedUser = { ...action.user, languages: action.user.languages.filter(lang => lang !== action.language) };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* create education */
  // createEducation$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_CREATE_EDUCATION),
  //   mergeMap((action: { type: string, user: User, education: Education }) => {
  //     const updatedUser = { ...action.user, education: [...action.user.education, action.education] };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_CREATE_EDUCATION_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_CREATE_EDUCATION_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* update education */
  // updateEducation$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_UPDATE_EDUCATION),
  //   mergeMap((action: { type: string, user: User, oldEducation: Education, newEducation: Education }) => {
  //     const updatedUser = {
  //       ...action.user,
  //       education: action.user.education.map(e => {
  //         if (e === action.oldEducation) return action.newEducation;
  //         else return e;
  //       })
  //     };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_UPDATE_EDUCATION_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_EDUCATION_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* delete education */
  // deleteEducation$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_DELETE_EDUCATION),
  //   mergeMap((action: { type: string, user: User, education: Education }) => {
  //     const updatedUser = { ...action.user, education: action.user.education.filter(e => e !== action.education) };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_DELETE_EDUCATION_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_DELETE_EDUCATION_ERROR, err: err }))
  //     )
  //   })
  // ));
}