import { RouterState } from '@store/router/router.state';
import { ActivityState } from '@store/activity/activity.state';
import { AuthState } from '@store/auth/auth.state';
import { UserState } from '@store/user/user.state';

export interface AppStore {
  authState: AuthState,
  userState: UserState,
  activityState: ActivityState,
  routerState: RouterState
}
