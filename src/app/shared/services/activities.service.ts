import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { API } from '@constants/api.constant';
import { Activity } from '@models/activity.model';

@Injectable({
  providedIn: "root",
})
export class ActivitiesService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private activitiesRefreshed$ = new Subject<void>();
  private activitiesVar: Activity[];
  private activityToShowRefreshed$ = new Subject<void>();
  private activityToShowVar: Activity;

  constructor(private http: HttpClient) { }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(API.activities).pipe(
      tap((act) => {
        this.activitiesVar = act;
        this.activitiesRefreshed$.next();
      })
    );
  }

  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${API.activities}/${id}`);
  }

  getActivitiesByOwner(owner: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${API.activities}/?owner=${encodeURIComponent(owner)}`);
  }

  createActivity(a: Activity): Observable<any> {
    return this.http.post(API.activities, a, this.httpOptions);
  }

  updateActivity(a: Activity): Observable<any> {
    this.activitiesVar = this.activitiesVar.map(ac => ac.id === a.id ? a : ac);
    return this.http.put(API.activities, a, this.httpOptions).pipe(
      tap(() => this.activitiesRefreshed$.next())
    );
  }

  deleteActivity(i: number): Observable<any> {
    const localIndex = this.activitiesVar.findIndex(ac => ac.id === i);
    this.activitiesVar.splice(localIndex, 1);
    return this.http.delete(`${API.activities}/${i}`).pipe(
      tap(() => this.activitiesRefreshed$.next())
    );
  }

  activitiesRefreshed(): Observable<void> {
    return this.activitiesRefreshed$;
  }

  get activities() {
    return this.activitiesVar;
  }

  activityToShowRefreshed(): Subject<void> {
    return this.activityToShowRefreshed$;
  }

  set activityToShow(ac: Activity) {
    this.activityToShowVar = ac;
  }

  get activityToShow() {
    return this.activityToShowVar;
  }

}
