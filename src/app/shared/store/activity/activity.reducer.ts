import { ActivityState } from './activity.state';
import * as ActivityActions from './activity.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultActivityState: ActivityState = {
  activities: null,
  activityToShow: null,
  loading: false,
};

const _activityReducer = createReducer(defaultActivityState,

  /* load */
  on(ActivityActions.ActivitiesLoad, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* load success */
  on(ActivityActions.ActivitiesLoadSuccess, (state, { activities }) => {
    return {
      ...state,
      activities: activities,
      loading: false
    }
  }),

  /* load error */
  on(ActivityActions.ActivitiesLoadError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* select */
  on(ActivityActions.ActivitySelect, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* select success */
  on(ActivityActions.ActivitySelectSuccess, (state, { activityId }) => {
    return {
      ...state,
      activityToShow: activityId,
      loading: false
    }
  }),

  /* select error */
  on(ActivityActions.ActivitySelectError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* signup */
  on(ActivityActions.ActivitySignup, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* signup success */
  on(ActivityActions.ActivitySignupSuccess, (state, { activity }) => {
    return {
      ...state,
      activities: state.activities.map(ac => {
        if (ac.id === activity.id) return activity;
        else return ac;
      }),
      loading: false
    }
  }),

  /* signup error */
  on(ActivityActions.ActivitySignupError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* signout */
  on(ActivityActions.ActivitySignout, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* signout success */
  on(ActivityActions.ActivitySignoutSuccess, (state, { activity }) => {
    return {
      ...state,
      activities: state.activities.map(ac => {
        if (ac.id === activity.id) return activity;
        else return ac;
      }),
      loading: false
    }
  }),

  /* signout error */
  on(ActivityActions.ActivitySignoutError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  // /* logout */
  // on(UserActions.UserLogout, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* logout success */
  // on(UserActions.UserLogoutSuccess, state => {
  //   return {
  //     ...state,
  //     user: null,
  //     loading: false
  //   }
  // }),

  // /* logout error */
  // on(UserActions.UserLogoutError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),

  // /* register */
  // on(UserActions.UserRegister, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* register success */
  // on(UserActions.UserRegisterSuccess, (state, { user }) => {
  //   console.log('reducer register', user)
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* register error */
  // on(UserActions.UserRegisterError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),

  // /* update profile */
  // on(UserActions.UserUpdatePersonalData, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* update profile success */
  // on(UserActions.UserUpdatePersonalDataSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* update profile error */
  // on(UserActions.UserUpdatePersonalDataError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),

  // /* create language */
  // on(UserActions.UserCreateLanguage, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* create language success */
  // on(UserActions.UserCreateLanguageSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* create language error */
  // on(UserActions.UserCreateLanguageError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),

  // /* update language */
  // on(UserActions.UserUpdateLanguage, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* update language success */
  // on(UserActions.UserUpdateLanguageSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* update language error */
  // on(UserActions.UserUpdateLanguageError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),

  // /* delete language */
  // on(UserActions.UserDeleteLanguage, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* delete language success */
  // on(UserActions.UserDeleteLanguageSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* delete language error */
  // on(UserActions.UserDeleteLanguageError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),

  // /* create education */
  // on(UserActions.UserCreateEducation, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* create education success */
  // on(UserActions.UserCreateEducationSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* create education error */
  // on(UserActions.UserCreateEducationError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),

  // /* update education */
  // on(UserActions.UserUpdateEducation, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* update education success */
  // on(UserActions.UserUpdateEducationSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* update education error */
  // on(UserActions.UserUpdateEducationError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // }),

  // /* delete education */
  // on(UserActions.UserDeleteEducation, state => {
  //   return {
  //     ...state,
  //     loading: true
  //   }
  // }),

  // /* delete education success */
  // on(UserActions.UserDeleteEducationSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false
  //   }
  // }),

  // /* delete education error */
  // on(UserActions.UserDeleteEducationError, (state, { err }) => {
  //   /* passar l'error a un servei de missatges ? */
  //   console.log('ERROR: ', err)
  //   return {
  //     ...state,
  //     loading: false
  //   }
  // })

);

export function activityReducer(state: ActivityState | undefined, action: Action) {
  return _activityReducer(state, action);
}
