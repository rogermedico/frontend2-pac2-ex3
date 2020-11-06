import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { Login } from '@models/login.model';
import { Store } from '@ngrx/store';
import { AppStore } from '@models/store.model';
import * as AuthActions from '@store/auth/auth.action';
import * as AuthSelectors from '@store/auth/auth.selector';
import { Observable } from 'rxjs';
import { User } from '@models/user.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  public title: string = 'Login';
  public wrongCredentials: Boolean = false;
  public loginForm: FormGroup;

  // public userLoggedIn$: Observable<User> = this.store$.select(AuthSelectors.selectUser);

  constructor(private fb: FormBuilder, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]],
    });
  }

  login() {

    const loginInfo: Login = {
      username: this.username.value,
      password: this.password.value
    }

    this.store$.dispatch(AuthActions.UserLogin({ loginInfo: loginInfo }));
    this.wrongCredentials = false;
    this.router.navigate(['']);


    // this.userService.getUserByEmail(this.username.value).subscribe(
    //   (user: User) => {
    //     if (user === undefined) {
    //       this.wrongCredentials = true;
    //       setTimeout(() => this.wrongCredentials = false, 10000);
    //       this.loginForm.reset();
    //       console.log('Username not found');
    //       return;
    //     }
    //     else if (user.loggedIn) {
    //       console.log('User already logged in');
    //       return;
    //     }
    //     else if (user.password !== this.password.value) {
    //       this.wrongCredentials = true;
    //       setTimeout(() => this.wrongCredentials = false, 10000);
    //       this.loginForm.reset();
    //       console.log('Wrong password');
    //       return;
    //     }
    //     else {
    //       this.store$.dispatch(AuthActions.UserLogin({ user: { ...user, loggedIn: true } }));
    //       this.wrongCredentials = false;
    //       console.log(`User ${user.email} logged in succesfully`);
    //       this.router.navigate(['']);

    //       // this.userService.login(user).subscribe(
    //       //   () => {
    //       //     this.wrongCredentials = false;
    //       //     console.log(`User ${user.email} logged in succesfully`);
    //       //     this.router.navigate(['']);
    //       //   }
    //       // );
    //     }
    //   }
    // );





  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
