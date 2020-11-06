import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '@models/store.model';
import { Store } from '@ngrx/store';
import * as UserActions from '@store/user/user.action';
import * as UserSelectors from '@store/user/user.selector';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import { User } from '@models/user.model';
import { count, map, take, tap } from 'rxjs/operators';

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
      take(1)
    ).subscribe(user => {
      this.store$.dispatch(UserActions.UserLogout({ user: user }));
    })
    // )

    // if (this.userService.userLoggedIn === undefined) {
    //   console.log('Nobody logged in at the moment');
    //   return;
    // }
    // else {
    //   this.userService.logout().subscribe(
    //     (us) => console.log('User logged out')
    //   )
    // }

  }
}
