import { ActivityState } from '@store/activity/activity.state';
import { UserState } from '@store/user/user.state';

export interface AppStore {
  userState: UserState,
  activityState: ActivityState
}
