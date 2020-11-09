import { routerReducer } from '@ngrx/router-store';
import { activityReducer } from './activity/activity.reducer';
import { userReducer } from './user/user.reducer';

export const reducers = {
  userState: userReducer,
  activityState: activityReducer,
  router: routerReducer
};
