import { UserState } from './user.state';
import * as UserActions from './user.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultUserState: UserState = {
  user: null,
  loading: false,
};

const _userReducer = createReducer(defaultUserState,

  /* login */
  on(UserActions.UserLogin, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* login success */
  on(UserActions.UserLoginSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* login error */
  on(UserActions.UserLoginError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* logout */
  on(UserActions.UserLogout, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* logout success */
  on(UserActions.UserLogoutSuccess, state => {
    return {
      ...state,
      user: null,
      loading: false
    }
  }),

  /* logout error */
  on(UserActions.UserLogoutError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* register */
  on(UserActions.UserRegister, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* register success */
  on(UserActions.UserRegisterSuccess, (state, { user }) => {
    console.log('reducer register', user)
    return {
      ...state,
      user: user,
      loading: false
    }
  }),

  /* register error */
  on(UserActions.UserRegisterError, (state, { err }) => {
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

  /* toggle favorite activity */
  on(UserActions.UserDeleteEducation, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* toggle favorite activity success */
  on(UserActions.UserDeleteEducationSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false
    }
  }),

  /* toggle favorite activity error */
  on(UserActions.UserDeleteEducationError, (state, { err }) => {
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
