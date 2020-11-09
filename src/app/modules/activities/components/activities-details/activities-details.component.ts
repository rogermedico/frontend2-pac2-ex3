import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '@models/activity.model';
import { AppStore } from '@models/store.model';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { ActivitiesService } from '@services/activities.service';
import { UserService } from '@services/user.service';
import { Observable, zip } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as ActivitySelectors from '@store/activity/activity.selector';
import * as UserActions from '@store/user/user.action';
import * as ActivityActions from '@store/activity/activity.action';
import { ActivitiesFavoritesService } from '../../services/activities-favorites.service';
import { ACTIVITY_STATUS } from '@constants/activity-status.constant';
import { UserActionTypes } from '@store/user/user.action';
import { last, skipWhile, tap } from 'rxjs/operators';
import { ActivityState } from '@store/activity/activity.state';

@Component({
  selector: 'app-activities-details',
  templateUrl: './activities-details.component.html',
  styleUrls: ['./activities-details.component.css']
})
export class ActivitiesDetailsComponent implements OnInit {

  public title: String = 'Activity Details';
  public activity: Activity;
  // public activityToShow: number;
  public user: User;
  public favorite: boolean;
  public status: string;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public activityState$: Observable<ActivityState> = this.store$.select(ActivitySelectors.selectAllActivityState);

  constructor(/*private us: UserService, private as: ActivitiesService,*/ private favService: ActivitiesFavoritesService, /*private router: Router,*/ private store$: Store<AppStore>) { }

  ngOnInit(): void {
    // this.user = this.us.userLoggedIn;
    this.userLoggedIn$.subscribe(userLoggedIn => this.user = userLoggedIn);
    this.activityState$.pipe(
      skipWhile(activityState => activityState.activities === null)
    ).subscribe(activityState => {
      this.activity = activityState.activities.find(ac => ac.id === activityState.activityToShow);
      if (this.activity) {
        this.favorite = this.favService.isFavorite(this.user, this.activity);
        this.checkStatus(this.activity);
      }
    });
  }

  checkStatus(ac: Activity) {
    if (ac.state != ACTIVITY_STATUS.cancelled) {
      if (ac.maxCapacity - ac.participatingUsers.length <= 0) {
        this.status = ACTIVITY_STATUS.complete;
      }
      else {
        this.status = ACTIVITY_STATUS.available;
      }
    }
    else {
      this.status = ACTIVITY_STATUS.cancelled;
    }
  }

  toggleFavorite() {
    this.store$.dispatch(UserActions.UserToggleFavoriteActivity({ user: this.user, activityId: this.activity.id }))
    // this.favorite = this.favService.toggleFavorite(this.activity, this.router.url);
  }

  signUp() {
    this.store$.dispatch(ActivityActions.ActivitySignup({ activity: this.activity, userId: this.user.id }));
    // this.activity.participatingUsers.push(this.user.id);
    // this.checkStatus(this.activity);
    // this.as.updateActivity(this.activity).subscribe(
    //   () => console.log(`User ${this.user.email} succesfully signed up for activity ${this.activity.id}`)
    // );
  }

  signOut() {
    this.store$.dispatch(ActivityActions.ActivitySignout({ activity: this.activity, userId: this.user.id }));
    // this.activity.participatingUsers.splice(this.activity.participatingUsers.findIndex(e => e === this.user.id), 1);
    // this.checkStatus(this.activity);
    // this.as.updateActivity(this.activity).subscribe(
    //   () => console.log(`User ${this.user.email} succesfully signed out of activity ${this.activity.id}`)
    // );
  }

}
