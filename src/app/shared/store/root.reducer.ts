import { routerReducer } from '@ngrx/router-store';
import { authReducer } from './auth/auth.reducer';

export const reducers = {
  auth: authReducer,
  router: routerReducer
};
