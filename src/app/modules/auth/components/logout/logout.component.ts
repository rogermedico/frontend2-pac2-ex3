import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '@models/store.model';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.action';
import * as UserSelectors from '@store/user/user.selector';
import { Observable } from 'rxjs';
import { User } from '@models/user.model';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);

  constructor(private store$: Store<AppStore>, private router: Router) { }

  ngOnInit(): void {
    this.logout();
    this.router.navigate(['']);
  }

  logout() {

    this.userLoggedIn$.pipe(
      take(1),
      map(user => {
        this.store$.dispatch(AuthActions.AuthLogout({ user: user }))
      })
    ).subscribe();

  }
}
