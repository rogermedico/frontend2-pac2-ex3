import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
    this.router.navigate(['']);
  }

  logout() {

    if (this.userService.userLoggedIn === undefined) {
      console.log('Nobody logged in at the moment');
      return;
    }
    else {
      this.userService.logout().subscribe(
        (us) => console.log('User logged out')
      )
    }

  }
}
