import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '@models/activity.model';
import { AppStore } from '@models/store.model';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { ActivitiesService } from '@services/activities.service';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import { ActivitiesFavoritesService } from '../../services/activities-favorites.service';

@Component({
  selector: 'app-activities-details',
  templateUrl: './activities-details.component.html',
  styleUrls: ['./activities-details.component.css']
})
export class ActivitiesDetailsComponent implements OnInit {

  public title: String = 'Activity Details';
  public activity: Activity;
  public user: User;
  public favorite: boolean;
  public status: string;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);

  constructor(/*private us: UserService,*/ private as: ActivitiesService, private favService: ActivitiesFavoritesService, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {
    // this.user = this.us.userLoggedIn;
    this.userLoggedIn$.subscribe(userLoggedIn => this.user = userLoggedIn);
    this.as.activityToShowRefreshed().subscribe(
      () => {
        this.activity = this.as.activityToShow;
        if (this.activity) {
          this.favorite = this.favService.isFavorite(this.activity);
          this.checkStatus();
        }
      }
    )
  }

  checkStatus() {
    if (this.activity.state != 'Cancelled') {
      if (this.activity.maxCapacity - this.activity.participatingUsers.length <= 0) {
        this.status = 'Complete';
      }
      else {
        this.status = 'Available';
      }
    }
    else {
      this.status = 'Cancelled';
    }
  }

  toggleFavorite() {
    this.favorite = this.favService.toggleFavorite(this.activity, this.router.url);
  }

  signUp() {
    this.activity.participatingUsers.push(this.user.id);
    this.checkStatus();
    this.as.updateActivity(this.activity).subscribe(
      () => console.log(`User ${this.user.email} succesfully signed up for activity ${this.activity.id}`)
    );
  }

  signOut() {
    this.activity.participatingUsers.splice(this.activity.participatingUsers.findIndex(e => e === this.user.id), 1);
    this.checkStatus();
    this.as.updateActivity(this.activity).subscribe(
      () => console.log(`User ${this.user.email} succesfully signed out of activity ${this.activity.id}`)
    );
  }

}
