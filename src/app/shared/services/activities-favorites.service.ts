import { Injectable } from "@angular/core";
import { UserService } from '@services/user.service';
import { Activity } from '@models/activity.model';
import { ActivitiesService } from '@services/activities.service';
import { User } from '@models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ActivitiesFavoritesService {

  constructor(private us: UserService) { }

  loadFavorites(user: User): Observable<number[]> {
    return of(JSON.parse(localStorage.getItem(user.email)));
  }

  toggleFavorite(user: User, activityId: number): Observable<number[]> {
    const storedFavs: number[] = JSON.parse(localStorage.getItem(user.email));

    if (storedFavs == null) {
      localStorage.setItem(this.us.userLoggedIn.email, JSON.stringify([activityId]));
    }
    else {
      const favFound = storedFavs.findIndex(id => id === activityId);
      if (favFound === -1) {
        storedFavs.push(activityId);
        localStorage.setItem(this.us.userLoggedIn.email, JSON.stringify(storedFavs));
      }
      else {
        storedFavs.splice(favFound, 1);
        localStorage.setItem(this.us.userLoggedIn.email, JSON.stringify(storedFavs));
      }

    }
    return of(JSON.parse(localStorage.getItem(user.email)));
  }


}
