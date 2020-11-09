import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Activity } from '@models/activity.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';

export enum ActivityActionTypes {
  ACTIVITIES_LOAD = '[Activity] ACTIVITIES_LOAD',
  ACTIVITIES_LOAD_SUCCESS = '[Activity] ACTIVITIES_LOAD_SUCCESS',
  ACTIVITIES_LOAD_ERROR = '[Activity] ACTIVITIES_LOAD_ERROR',

  ACTIVITY_CREATE = '[Activity] ACTIVITY_CREATE',
  ACTIVITY_CREATE_SUCCESS = '[Activity] ACTIVITY_CREATE_SUCCESS',
  ACTIVITY_CREATE_ERROR = '[Activity] ACTIVITY_CREATE_ERROR',

  ACTIVITY_UPDATE = '[Activity] ACTIVITY_UPDATE_LANGUAGE',
  ACTIVITY_UPDATE_SUCCESS = '[Activity] ACTIVITY_UPDATE_SUCCESS',
  ACTIVITY_UPDATE_ERROR = '[Activity] ACTIVITY_UPDATE_ERROR',

  ACTIVITY_SELECT = '[Activity] ACTIVITY_SELECT',
  ACTIVITY_SELECT_SUCCESS = '[Activity] ACTIVITY_SELECT_SUCCESS',
  ACTIVITY_SELECT_ERROR = '[Activity] ACTIVITY_SELECT_ERROR',

  ACTIVITY_DELETE = '[Activity] ACTIVITY_DELETE_LANGUAGE',
  ACTIVITY_DELETE_SUCCESS = '[Activity] ACTIVITY_DELETE_SUCCESS',
  ACTIVITY_DELETE_ERROR = '[Activity] ACTIVITY_DELETE_ERROR',

  ACTIVITY_SIGNUP = '[Activity] ACTIVIYT_SIGNUP',
  ACTIVITY_SIGNUP_SUCCESS = '[Activity] ACTIVIYT_SIGNUP_SUCCESS',
  ACTIVITY_SIGNUP_ERROR = '[Activity] ACTIVIYT_SIGNUP_ERROR',

  ACTIVITY_SIGNOUT = '[Activity] ACTIVIYT_SIGNOUT',
  ACTIVITY_SIGNOUT_SUCCESS = '[Activity] ACTIVIYT_SIGNOUT_SUCCESS',
  ACTIVITY_SIGNOUT_ERROR = '[Activity] ACTIVIYT_SIGNOUT_ERROR',
}

/* load activities */
export const ActivitiesLoad = createAction(ActivityActionTypes.ACTIVITIES_LOAD);
export const ActivitiesLoadSuccess = createAction(ActivityActionTypes.ACTIVITIES_LOAD_SUCCESS, props<{ activities: Activity[] }>());
export const ActivitiesLoadError = createAction(ActivityActionTypes.ACTIVITIES_LOAD_ERROR, props<{ err: String }>());

/* create activity */
export const ActivityCreate = createAction(ActivityActionTypes.ACTIVITY_CREATE, props<{ user: User, activity: Language }>());
export const ActivityCreateSuccess = createAction(ActivityActionTypes.ACTIVITY_CREATE_SUCCESS, props<{ user: User }>());
export const ActivityCreateError = createAction(ActivityActionTypes.ACTIVITY_CREATE_ERROR, props<{ err: String }>());

/* update activity */
export const ActivityUpdate = createAction(ActivityActionTypes.ACTIVITY_UPDATE, props<{ user: User, oldLanguage: Language, newLanguage: Language }>());
export const ActivityUpdateSuccess = createAction(ActivityActionTypes.ACTIVITY_UPDATE_SUCCESS, props<{ user: User }>());
export const ActivityUpdateError = createAction(ActivityActionTypes.ACTIVITY_UPDATE_ERROR, props<{ err: String }>());

/* delete activity */
export const ActivityDelete = createAction(ActivityActionTypes.ACTIVITY_DELETE, props<{ user: User, activity: Language }>());
export const ActivityDeleteSuccess = createAction(ActivityActionTypes.ACTIVITY_DELETE_SUCCESS, props<{ user: User }>());
export const ActivityDeleteError = createAction(ActivityActionTypes.ACTIVITY_DELETE_ERROR, props<{ err: String }>());

/* select activity */
export const ActivitySelect = createAction(ActivityActionTypes.ACTIVITY_SELECT, props<{ activityId: number }>());
export const ActivitySelectSuccess = createAction(ActivityActionTypes.ACTIVITY_SELECT_SUCCESS, props<{ activityId: number }>());
export const ActivitySelectError = createAction(ActivityActionTypes.ACTIVITY_SELECT_ERROR, props<{ err: String }>());

/* signup activity */
export const ActivitySignup = createAction(ActivityActionTypes.ACTIVITY_SIGNUP, props<{ activity: Activity, userId: number }>());
export const ActivitySignupSuccess = createAction(ActivityActionTypes.ACTIVITY_SIGNUP_SUCCESS, props<{ activity: Activity }>());
export const ActivitySignupError = createAction(ActivityActionTypes.ACTIVITY_SIGNUP_ERROR, props<{ err: String }>());

/* signout activity */
export const ActivitySignout = createAction(ActivityActionTypes.ACTIVITY_SIGNOUT, props<{ activity: Activity, userId: number }>());
export const ActivitySignoutSuccess = createAction(ActivityActionTypes.ACTIVITY_SIGNOUT_SUCCESS, props<{ activity: Activity }>());
export const ActivitySignoutError = createAction(ActivityActionTypes.ACTIVITY_SIGNOUT_ERROR, props<{ err: String }>());
