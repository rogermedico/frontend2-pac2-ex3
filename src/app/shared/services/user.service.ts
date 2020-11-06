import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { catchError, flatMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { User } from '@models/user.model';
import { API } from '@constants/api.constant';
import { ActivitiesService } from '@services/activities.service';
import { Login } from '@models/login.model';
import { MessageService } from '@services/message.service';

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

  constructor(private http: HttpClient, private as: ActivitiesService, private ms: MessageService) { }

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

  login(loginInfo: Login): Observable<User> {
    return this.getUserByEmail(loginInfo.username).pipe(
      tap(user => {
        if (user && (user.password === loginInfo.password)) {
          /* el loggedIn de user potser s'ha d'eliminar */
          user = { ...user, loggedIn: true };
          this.http.put<User>(API.users, user, this.httpOptions);
          return of(user);
        }
        else {
          throw 'login error';
        }
      }),
      /* aixo ha d'anar fora d'aqui */
      tap(user => {
        this.userLoggedInVar = user;
        this.as.getActivities().subscribe();
        this.userLoggedInRefreshed$.next();
      })
      /****************************** */
    )
  }

  logout(user: User): Observable<any> {
    /* el loggedIn de user potser s'ha d'eliminar */
    user = { ...user, loggedIn: false };
    return this.http.put(API.users, user, this.httpOptions).pipe(
      /* aixo ha d'anar fora d'aqui */
      tap(() => {
        this.userLoggedInVar = undefined;
        this.userLoggedInRefreshed$.next();
      }),
      /******************************** */

    );
  }

  register(user: User): Observable<User> {
    return this.getUserByEmail(user.email).pipe(
      flatMap(u => {
        if (!u) {
          /* aixo ha d'anar fora d'aqui */
          this.userLoggedInVar = user;
          this.userLoggedInRefreshed$.next();
          /***************************** */
          return this.http.post<User>(API.users, user, this.httpOptions)
        }
        else {
          throw 'register error';
        }

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
