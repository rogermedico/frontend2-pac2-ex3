import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Login } from '@models/login.model';
import { Store } from '@ngrx/store';
import { AppStore } from '@models/store.model';
import * as UserActions from '@store/user/user.action';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  public title: string = 'Login';
  public wrongCredentials: Boolean = false;
  public loginForm: FormGroup;

  constructor(private store$: Store<AppStore>, private fb: FormBuilder, private router: Router) { }

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

    this.store$.dispatch(UserActions.UserLogin({ loginInfo: loginInfo }));
    this.wrongCredentials = false;
    this.router.navigate(['']);

  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
