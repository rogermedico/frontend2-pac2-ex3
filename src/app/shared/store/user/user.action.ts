import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';

export enum UserActionTypes {
  USER_SIGNIN = '[User] USER_SIGNIN',
  USER_SIGNIN_SUCCESS = '[User] USER_SIGNIN_SUCCESS',
  USER_SIGNIN_ERROR = '[User] USER_SIGNIN_ERROR',

  USER_SIGNOUT = '[User] USER_SIGNOUT',
  USER_SIGNOUT_SUCCESS = '[User] USER_SIGNOUT_SUCCESS',
  USER_SIGNOUT_ERROR = '[User] USER_SIGNOUT_ERROR',

  USER_MODIFY_PERSONAL_DATA = '[User/Profile] USER_MODIFY_PERSONAL_DATA',
  USER_MODIFY_PERSONAL_DATA_SUCCESS = '[User/Profile] USER_MODIFY_PERSONAL_DATA_SUCCESS',
  USER_MODIFY_PERSONAL_DATA_ERROR = '[User/Profile] USER_MODIFY_PERSONAL_DATA_ERROR',

  USER_DISCARD_PERSONAL_DATA_CHANGES = '[User/Profile] USER_DISCARD_PERSONAL_DATA_CHANGES',
  USER_DISCARD_PERSONAL_DATA_CHANGES_SUCCESS = '[User/Profile] USER_DISCARD_PERSONAL_DATA_CHANGES_SUCCESS',
  USER_DISCARD_PERSONAL_DATA_CHANGES_ERROR = '[User/Profile] USER_DISCARD_PERSONAL_DATA_CHANGES_ERROR',

  USER_UPDATE_PERSONAL_DATA = '[User/Profile] USER_UPDATE_PERSONAL_DATA',
  USER_UPDATE_PERSONAL_DATA_SUCCESS = '[User/Profile] USER_UPDATE_PERSONAL_DATA_SUCCESS',
  USER_UPDATE_PERSONAL_DATA_ERROR = '[User/Profile] USER_UPDATE_PERSONAL_DATA_ERROR',

  USER_CREATE_LANGUAGE = '[User/Language] USER_CREATE_LANGUAGE',
  USER_CREATE_LANGUAGE_SUCCESS = '[User/Language] USER_CREATE_LANGUAGE_SUCCESS',
  USER_CREATE_LANGUAGE_ERROR = '[User/Language] USER_CREATE_LANGUAGE_ERROR',

  USER_UPDATE_LANGUAGE = '[User/Language] USER_UPDATE_LANGUAGE',
  USER_UPDATE_LANGUAGE_SUCCESS = '[User/Language] USER_UPDATE_LANGUAGE_SUCCESS',
  USER_UPDATE_LANGUAGE_ERROR = '[User/Language] USER_UPDATE_LANGUAGE_ERROR',

  USER_DELETE_LANGUAGE = '[User/Language] USER_DELETE_LANGUAGE',
  USER_DELETE_LANGUAGE_SUCCESS = '[User/Language] USER_DELETE_LANGUAGE_SUCCESS',
  USER_DELETE_LANGUAGE_ERROR = '[User/Language] USER_DELETE_LANGUAGE_ERROR',

  USER_CREATE_EDUCATION = '[User/Education] USER_CREATE_EDUCATION',
  USER_CREATE_EDUCATION_SUCCESS = '[User/Education] USER_CREATE_EDUCATION_SUCCESS',
  USER_CREATE_EDUCATION_ERROR = '[User/Education] USER_CREATE_EDUCATION_ERROR',

  USER_UPDATE_EDUCATION = '[User/Education] USER_UPDATE_EDUCATION',
  USER_UPDATE_EDUCATION_SUCCESS = '[User/Education] USER_UPDATE_EDUCATION_SUCCESS',
  USER_UPDATE_EDUCATION_ERROR = '[User/Education] USER_UPDATE_EDUCATION_ERROR',

  USER_DELETE_EDUCATION = '[User/Education] USER_DELETE_EDUCATION',
  USER_DELETE_EDUCATION_SUCCESS = '[User/Education] USER_DELETE_EDUCATION_SUCCESS',
  USER_DELETE_EDUCATION_ERROR = '[User/Education] USER_DELETE_EDUCATION_ERROR',

  USER_LOAD_FAVORITE_ACTIVITIES = '[User/Favorite] USER_LOAD_FAVORITE_ACTIVITIES',
  USER_LOAD_FAVORITE_ACTIVITIES_SUCCESS = '[User/Favorite] USER_LOAD_FAVORITE_ACTIVITIES_SUCCESS',
  USER_LOAD_FAVORITE_ACTIVITIES_ERROR = '[User/Favorite] USER_LOAD_FAVORITE_ACTIVITIES_ERROR',

  USER_TOGGLE_FAVORITE_ACTIVITY = '[User/Favorite] USER_TOGGLE_FAVORITE_ACTIVITY',
  USER_TOGGLE_FAVORITE_ACTIVITY_SUCCESS = '[User/Favorite] USER_TOGGLE_FAVORITE_ACTIVITYE_SUCCESS',
  USER_TOGGLE_FAVORITE_ACTIVITY_ERROR = '[User/Favorite] USER_TOGGLE_FAVORITE_ACTIVITY_ERROR',
}

/* signin */
export const UserSignin = createAction(UserActionTypes.USER_SIGNIN, props<{ loginInfo: Login }>());
export const UserSigninSuccess = createAction(UserActionTypes.USER_SIGNIN_SUCCESS, props<{ user: User }>());
export const UserSigninError = createAction(UserActionTypes.USER_SIGNIN_ERROR, props<{ err: String }>());

/* signout */
export const UserSignout = createAction(UserActionTypes.USER_SIGNOUT);
export const UserSignoutSuccess = createAction(UserActionTypes.USER_SIGNOUT_SUCCESS);
export const UserSignoutError = createAction(UserActionTypes.USER_SIGNOUT_ERROR, props<{ err: String }>());

/* user modify profile */
export const UserModifyPersonalData = createAction(UserActionTypes.USER_MODIFY_PERSONAL_DATA);
export const UserModifyPersonalDataSuccess = createAction(UserActionTypes.USER_MODIFY_PERSONAL_DATA_SUCCESS);
export const UserModifyPersonalDataError = createAction(UserActionTypes.USER_MODIFY_PERSONAL_DATA_ERROR, props<{ err: String }>());

/* user discard profile changes */
export const UserDiscardPersonalDataChanges = createAction(UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES);
export const UserDiscardPersonalDataChangesSuccess = createAction(UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES_SUCCESS);
export const UserDiscardPersonalDataChangesError = createAction(UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES_ERROR, props<{ err: String }>());

/* user update profile */
export const UserUpdatePersonalData = createAction(UserActionTypes.USER_UPDATE_PERSONAL_DATA, props<{ user: User }>());
export const UserUpdatePersonalDataSuccess = createAction(UserActionTypes.USER_UPDATE_PERSONAL_DATA_SUCCESS, props<{ user: User }>());
export const UserUpdatePersonalDataError = createAction(UserActionTypes.USER_UPDATE_PERSONAL_DATA_ERROR, props<{ err: String }>());

/* create language */
export const UserCreateLanguage = createAction(UserActionTypes.USER_CREATE_LANGUAGE, props<{ user: User, language: Language }>());
export const UserCreateLanguageSuccess = createAction(UserActionTypes.USER_CREATE_LANGUAGE_SUCCESS, props<{ user: User }>());
export const UserCreateLanguageError = createAction(UserActionTypes.USER_CREATE_LANGUAGE_ERROR, props<{ err: String }>());

/* update language */
export const UserUpdateLanguage = createAction(UserActionTypes.USER_UPDATE_LANGUAGE, props<{ user: User, oldLanguage: Language, newLanguage: Language }>());
export const UserUpdateLanguageSuccess = createAction(UserActionTypes.USER_UPDATE_LANGUAGE_SUCCESS, props<{ user: User }>());
export const UserUpdateLanguageError = createAction(UserActionTypes.USER_UPDATE_LANGUAGE_ERROR, props<{ err: String }>());

/* delete language */
export const UserDeleteLanguage = createAction(UserActionTypes.USER_DELETE_LANGUAGE, props<{ user: User, language: Language }>());
export const UserDeleteLanguageSuccess = createAction(UserActionTypes.USER_DELETE_LANGUAGE_SUCCESS, props<{ user: User }>());
export const UserDeleteLanguageError = createAction(UserActionTypes.USER_DELETE_LANGUAGE_ERROR, props<{ err: String }>());

/* create education */
export const UserCreateEducation = createAction(UserActionTypes.USER_CREATE_EDUCATION, props<{ user: User, education: Education }>());
export const UserCreateEducationSuccess = createAction(UserActionTypes.USER_CREATE_EDUCATION_SUCCESS, props<{ user: User }>());
export const UserCreateEducationError = createAction(UserActionTypes.USER_CREATE_EDUCATION_ERROR, props<{ err: String }>());

/* update education */
export const UserUpdateEducation = createAction(UserActionTypes.USER_UPDATE_EDUCATION, props<{ user: User, oldEducation: Education, newEducation: Education }>());
export const UserUpdateEducationSuccess = createAction(UserActionTypes.USER_UPDATE_EDUCATION_SUCCESS, props<{ user: User }>());
export const UserUpdateEducationError = createAction(UserActionTypes.USER_UPDATE_EDUCATION_ERROR, props<{ err: String }>());

/* delete education */
export const UserDeleteEducation = createAction(UserActionTypes.USER_DELETE_EDUCATION, props<{ user: User, education: Education }>());
export const UserDeleteEducationSuccess = createAction(UserActionTypes.USER_DELETE_EDUCATION_SUCCESS, props<{ user: User }>());
export const UserDeleteEducationError = createAction(UserActionTypes.USER_DELETE_EDUCATION_ERROR, props<{ err: String }>());

/* load favorite activities */
export const UserLoadFavoriteActivities = createAction(UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES, props<{ user: User }>());
export const UserLoadFavoriteActivitiesSuccess = createAction(UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES_SUCCESS, props<{ favoriteActivities: number[] }>());
export const UserLoadFavoriteActivitiesError = createAction(UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES_ERROR, props<{ err: String }>());

/* toggle favorite activity */
export const UserToggleFavoriteActivity = createAction(UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY, props<{ user: User, activityId: number }>());
export const UserToggleFavoriteActivitySuccess = createAction(UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY_SUCCESS, props<{ favoriteActivities: number[] }>());
export const UserToggleFavoriteActivityError = createAction(UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY_ERROR, props<{ err: String }>());