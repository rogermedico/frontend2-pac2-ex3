import { routerReducer } from '@ngrx/router-store';
import { activityReducer } from './activity/activity.reducer';
import { authReducer } from './auth/auth.reducer';
import { userReducer } from './user/user.reducer';

export const reducers = {
  authState: authReducer,
  userState: userReducer,
  activityState: activityReducer,
  router: routerReducer
};
