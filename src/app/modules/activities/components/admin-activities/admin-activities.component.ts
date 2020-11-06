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

@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.css']
})
export class AdminActivitiesComponent implements OnInit {

  public title: String = 'Edit Activities';
  public user: User;
  public activities: Activity[];
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);

  constructor(private us: UserService, private as: ActivitiesService, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {
    // this.userLoggedIn = this.us.userLoggedIn;
    this.userLoggedIn$.subscribe(userLoggedIn => this.user = userLoggedIn);
    this.activities = this.as.activities.filter(ac => ac.owner === this.user.id);
    this.as.activitiesRefreshed().subscribe(
      () => this.activities = this.as.activities.filter(ac => ac.owner === this.user.id)
    );
  }

  createActivity() {
    this.router.navigate(['/activities/admin/new']);
  }

  updateActivity(id: number) {
    this.router.navigate(['/activities/admin/edit', id]);
  }

  deleteActivity(i: number) {
    if (confirm('You are about to delete an activity record. Are you sure?')) {
      const localIndex = this.activities.findIndex(ac => ac.id === i);
      this.activities.splice(localIndex, 1);
      console.log('activity id: ', i, 'local index: ', localIndex);
      console.log('local activities', this.activities);
      this.as.deleteActivity(i).subscribe(
        () => console.log(`Activity ${i} deleted`)
      );
    }
  }

}
