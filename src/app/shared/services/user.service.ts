import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";
import { User } from '@models/user.model';
import { API } from '@constants/api.constant';
import { ActivitiesService } from '@services/activities.service';
import { Login } from '@models/login.model';

@Injectable({
  providedIn: "root",
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private profileDataSavedVar: boolean = true;

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

  login(loginInfo: Login): Observable<User> {
    return this.getUserByEmail(loginInfo.username).pipe(
      mergeMap(user => {
        if (user && (user.password === loginInfo.password)) {
          user = { ...user, loggedIn: true };
          this.http.put<User>(API.users, user, this.httpOptions);
          return of(user);
        }
        else {
          throw 'login error';
        }
      }),
    )
  }

  logout(user: User): Observable<any> {
    user = { ...user, loggedIn: false };
    return this.http.put(API.users, user, this.httpOptions);
  }

  register(user: User): Observable<User> {
    return this.getUserByEmail(user.email).pipe(
      mergeMap(u => {
        if (!u) {
          return this.http.post<User>(API.users, user, this.httpOptions)
        }
        else {
          throw 'register error';
        }

      })
    );

  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API.users, user, this.httpOptions).pipe(
      tap(() => this.profileDataSaved = true)
    );
  }

  set profileDataSaved(saved: boolean) {
    this.profileDataSavedVar = saved;
  }

  get profileDataSaved() {
    return this.profileDataSavedVar;
  }

}
