import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '@models/activity.model';
import { User } from '@models/user.model';
import { ActivitiesService } from '@services/activities.service';
import { UserService } from '@services/user.service';
import { ActivitiesFavoritesService } from '../../services/activities-favorites.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

  public title: String = 'Activities List';
  public activities: Activity[];
  public user: User;

  constructor(private us: UserService, private as: ActivitiesService, private router: Router, private af: ActivitiesFavoritesService) { }

  ngOnInit(): void {
    this.user = this.us.userLoggedIn;
    this.populateActivities();

  }

  populateActivities() {
    if (!this.user) {
      this.as.getActivities().subscribe(
        (act) => this.activities = act
      );
    }
    else {
      if (this.router.url === '/favorites') {
        this.activities = this.as.activities.filter(ac => this.af.isFavorite(ac));
      }
      else if (this.router.url === '/myactivities') {
        this.activities = this.as.activities.filter(ac => ac.participatingUsers.find(id => this.user.id === id));
      }
      else {
        this.activities = this.as.activities;
      }
    }
  }

  showDetails(ac: Activity) {
    this.as.activityToShow = ac;
    this.as.activityToShowRefreshed().next();
  }

}
