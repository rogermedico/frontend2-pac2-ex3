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
import { ActivitiesFavoritesService } from '../../../../shared/services/activities-favorites.service';
import { ACTIVITY_STATUS } from '@constants/activity-status.constant';
import { UserActionTypes } from '@store/user/user.action';
import { last, map, skipUntil, skipWhile, tap } from 'rxjs/operators';
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

  constructor(/*private us: UserService, private as: ActivitiesService, private favService: ActivitiesFavoritesService, private router: Router,*/ private store$: Store<AppStore>) { }

  ngOnInit(): void {
    // this.user = this.us.userLoggedIn;
    this.userLoggedIn$.pipe(
      skipWhile(user => user === null),
      map(userLoggedIn => {
        this.user = userLoggedIn;
        if (userLoggedIn.favoriteActivities && this.activity) {
          this.user.favoriteActivities.find(activityId => activityId == this.activity.id) !== undefined ? this.favorite = true : this.favorite = false;
        }
        else this.favorite = false;
      })
    ).subscribe();

    this.activityState$.pipe(
      skipWhile(activityState => activityState.loading === true),
      map(activityState => {
        const activity = activityState.activities.find(ac => ac.id === activityState.activityToShow);
        if (activity) {
          this.activity = activity;
          if (this.user) {
            if (this.user.favoriteActivities) {
              this.user.favoriteActivities.find(activityId => activityId == this.activity.id) !== undefined ? this.favorite = true : this.favorite = false;
            }
            else this.favorite = false;

          }
          this.checkStatus(this.activity);
        }
      })
    ).subscribe();

    // this.userLoggedIn$.pipe(
    //   skipWhile(user => user === null),
    //   skipUntil(this.activityState$.pipe(
    //     tap(a => console.log('skipuntil', a)),
    //     skipWhile(activityState => activityState.activityToShow !== null),
    //   ))
    // ).subscribe(userLoggedIn => {
    //   console.log('suscribe', this.activity)
    //   this.user = userLoggedIn;
    //   if (userLoggedIn.favoriteActivities) {
    //     userLoggedIn.favoriteActivities.find(activityId => activityId == this.activity.id) !== -1 ? this.favorite = true : this.favorite = false;
    //   }
    //   else this.favorite = false;
    // });



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
