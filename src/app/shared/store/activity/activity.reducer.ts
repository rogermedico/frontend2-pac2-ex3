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

  /* create activity */
  on(ActivityActions.ActivityCreate, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* create activity success */
  on(ActivityActions.ActivityCreateSuccess, (state, { activity }) => {
    return {
      ...state,
      activities: [...state.activities, activity],
      loading: false
    }
  }),

  /* create activity error */
  on(ActivityActions.ActivityCreateError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* update activity */
  on(ActivityActions.ActivityUpdate, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* update activity success */
  on(ActivityActions.ActivityUpdateSuccess, (state, { activity }) => {
    return {
      ...state,
      activities: state.activities.map(a => {
        if (a.id === activity.id) return activity;
        else return a;
      }),
      loading: false
    }
  }),

  /* update activity error */
  on(ActivityActions.ActivityUpdateError, (state, { err }) => {
    /* passar l'error a un servei de missatges ? */
    console.log('ERROR: ', err)
    return {
      ...state,
      loading: false
    }
  }),

  /* delete activity */
  on(ActivityActions.ActivityDelete, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* delete activity success */
  on(ActivityActions.ActivityDeleteSuccess, (state, { activityId }) => {
    return {
      ...state,
      activities: state.activities.filter(a => a.id !== activityId),
      loading: false
    }
  }),

  /* delete activity error */
  on(ActivityActions.ActivityDeleteError, (state, { err }) => {
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

  /* deselect */
  on(ActivityActions.ActivityDeselect, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /* deselect success */
  on(ActivityActions.ActivityDeselectSuccess, state => {
    return {
      ...state,
      activityToShow: null,
      loading: false
    }
  }),

  /* deselect error */
  on(ActivityActions.ActivityDeselectError, (state, { err }) => {
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

);

export function activityReducer(state: ActivityState | undefined, action: Action) {
  return _activityReducer(state, action);
}
