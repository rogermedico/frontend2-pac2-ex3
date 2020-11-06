import { routerReducer } from '@ngrx/router-store';
import { userReducer } from './user/user.reducer';

export const reducers = {
  userState: userReducer,
  router: routerReducer
};
