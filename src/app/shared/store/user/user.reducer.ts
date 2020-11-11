import { UserState } from './user.state';
import * as UserActions from './user.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultUserState: UserState = {
  user: null,
  loading: false,
};

const _userReducer = createReducer(defaultUserState,

  /* signin */
  on(UserActions.UserSignin, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* signin success */
  on(UserActions.UserSigninSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* signin error */
  on(UserActions.UserSigninError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* signout */
  on(UserActions.UserSignout, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* signout success */
  on(UserActions.UserSignoutSuccess, state => {
    return {
      ...state,
      user: null,
      loading: false
    }
  }),

  /* signout error */
  on(UserActions.UserSignoutError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* update profile */
  on(UserActions.UserUpdatePersonalData, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* update profile success */
  on(UserActions.UserUpdatePersonalDataSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* update profile error */
  on(UserActions.UserUpdatePersonalDataError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* create language */
  on(UserActions.UserCreateLanguage, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* create language success */
  on(UserActions.UserCreateLanguageSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* create language error */
  on(UserActions.UserCreateLanguageError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* update language */
  on(UserActions.UserUpdateLanguage, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* update language success */
  on(UserActions.UserUpdateLanguageSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* update language error */
  on(UserActions.UserUpdateLanguageError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* delete language */
  on(UserActions.UserDeleteLanguage, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* delete language success */
  on(UserActions.UserDeleteLanguageSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* delete language error */
  on(UserActions.UserDeleteLanguageError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* create education */
  on(UserActions.UserCreateEducation, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* create education success */
  on(UserActions.UserCreateEducationSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* create education error */
  on(UserActions.UserCreateEducationError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* update education */
  on(UserActions.UserUpdateEducation, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* update education success */
  on(UserActions.UserUpdateEducationSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* update education error */
  on(UserActions.UserUpdateEducationError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* delete education */
  on(UserActions.UserDeleteEducation, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* delete education success */
  on(UserActions.UserDeleteEducationSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* delete education error */
  on(UserActions.UserDeleteEducationError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* load favorite activities */
  on(UserActions.UserLoadFavoriteActivities, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* load favorite activities success */
  on(UserActions.UserLoadFavoriteActivitiesSuccess, (state, { favoriteActivities }) => {
    return {
      ...state,
      user: {
        ...state.user,
        favoriteActivities: favoriteActivities
      },
      loading: false
    }
  }),

  /* load favorite activities error */
  on(UserActions.UserLoadFavoriteActivitiesError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* toggle favorite activity */
  on(UserActions.UserToggleFavoriteActivity, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* toggle favorite activity success */
  on(UserActions.UserToggleFavoriteActivitySuccess, (state, { favoriteActivities }) => {
    return {
      ...state,
      user: {
        ...state.user,
        favoriteActivities: favoriteActivities
      },
      loading: false
    }
  }),

  /* toggle favorite activity error */
  on(UserActions.UserToggleFavoriteActivityError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  })

);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
