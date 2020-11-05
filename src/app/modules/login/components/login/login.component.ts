import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  public title: string = 'Login';
  public wrongCredentials: Boolean = false;
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
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

    if (!this.loginForm.valid) {
      console.log('This form is in an invalid state');
      return;
    }


    if (this.userService.userLoggedIn !== undefined) {
      console.log(`User ${this.userService.userLoggedIn.email} must logout first`);
      return;
    }
    else {
      this.userService.getUserByEmail(this.username.value).subscribe(
        (user: User) => {
          if (user === undefined) {
            this.wrongCredentials = true;
            setTimeout(() => this.wrongCredentials = false, 10000);
            this.loginForm.reset();
            console.log('Username not found');
            return;
          }
          else if (user.loggedIn) {
            console.log('User already logged in');
            return;
          }
          else if (user.password !== this.password.value) {
            this.wrongCredentials = true;
            setTimeout(() => this.wrongCredentials = false, 10000);
            this.loginForm.reset();
            console.log('Wrong password');
            return;
          }
          else {
            this.userService.login(user).subscribe(
              () => {
                this.wrongCredentials = false;
                console.log(`User ${user.email} logged in succesfully`);
                this.router.navigate(['']);
              }
            );
          }
        }
      );
    }




  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
