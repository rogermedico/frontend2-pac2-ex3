import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from '@models/user.model';
import { API } from '@constants/api.constant';
import { ActivitiesService } from '@services/activities.service';

@Injectable({
  providedIn: "root",
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private userLoggedInRefreshed$ = new Subject<void>();
  private profileDataSavedVar: boolean = true;
  private userLoggedInVar: User;

  constructor(private http: HttpClient, private as: ActivitiesService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API.users);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${API.users}/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${API.users}/?email=${encodeURIComponent(email)}`).pipe(
      map(user => user[0])
    );
  }

  // getUserLoggedIn(): Observable<User> {
  //   return this.http.get<User>(`${API.users}/?loggedIn=true`).pipe(
  //     map(user => user[0])
  //   );
  // }

  login(user: User): Observable<any> {
    user.loggedIn = true;
    return this.http.put(API.users, user, this.httpOptions).pipe(
      tap(() => {
        this.userLoggedInVar = user;
        this.as.getActivities().subscribe();
        this.userLoggedInRefreshed$.next();
      })
    );
  }

  logout(): Observable<any> {
    this.userLoggedInVar.loggedIn = false;
    return this.http.put(API.users, this.userLoggedInVar, this.httpOptions).pipe(
      tap(() => {
        this.userLoggedInVar = undefined;
        this.userLoggedInRefreshed$.next();
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(API.users, user, this.httpOptions).pipe(
      tap(() => {
        this.userLoggedInVar = user;
        this.userLoggedInRefreshed$.next();
      })
    );
  }

  updateUser(user: User): Observable<any> {
    this.userLoggedInVar = user;
    return this.http.put(API.users, user, this.httpOptions).pipe(
      // tap(() => this.refreshUserService$.next())
    );
  }

  userLoggedInRefreshed(): Observable<void> {
    return this.userLoggedInRefreshed$;
  }

  set profileDataSaved(saved: boolean) {
    this.profileDataSavedVar = saved;
  }

  get profileDataSaved() {
    return this.profileDataSavedVar;
  }

  get userLoggedIn() {
    return this.userLoggedInVar;
  }

}
