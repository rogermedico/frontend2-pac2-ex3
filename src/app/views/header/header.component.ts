import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title: string = 'UOC activities organizer';
  public userLoggedIn: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userLoggedInRefreshed().subscribe(
      () => this.userLoggedIn = this.userService.userLoggedIn
    );
    this.getUserLoggedIn();
  }

  getUserLoggedIn() {
    // this.userService.getUserLoggedIn().subscribe(
    //   (user) => {
    //     this.userLoggedIn = user
    //     console.log('User logged in: ', user);
    //   }
    // )
    this.userLoggedIn = this.userService.userLoggedIn;
    console.log('User logged in: ', this.userLoggedIn);
  }

}
