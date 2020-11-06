import { Component, OnInit } from '@angular/core';
import { AppStore } from '@models/store.model';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
// import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import * as AuthSelectors from '@store/auth/auth.selector';
import { USER_TYPES } from '@constants/user-types.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title: string = 'UOC activities organizer';

  public userLoggedIn$: Observable<User> = this.store$.select(AuthSelectors.selectUser);
  // public userLoggedIn: User;
  public userTypes = USER_TYPES;

  constructor(private store$: Store<AppStore>/*, private userService: UserService*/) { }

  ngOnInit(): void {

    // this.userTypes = {
    //   tourist:USER_TYPES.tourist,
    //   company:USER_TYPES.company
    // };

    // this.userLoggedIn$.subscribe(u => this.userLoggedIn = u);

    //   this.userService.userLoggedInRefreshed().subscribe(
    //     () => this.userLoggedIn = this.userService.userLoggedIn
    //   );
    // this.getUserLoggedIn();
  }

  // getUserLoggedIn() {
  //   // this.userService.getUserLoggedIn().subscribe(
  //   //   (user) => {
  //   //     this.userLoggedIn = user
  //   //     console.log('User logged in: ', user);
  //   //   }
  //   // )
  //   this.userLoggedIn = this.userService.userLoggedIn;
  //   console.log('User logged in: ', this.userLoggedIn);
  // }

}
