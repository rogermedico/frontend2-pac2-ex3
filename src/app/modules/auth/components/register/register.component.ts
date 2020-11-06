import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { USER_TYPES } from '@constants/user-types.constant';
import { User } from "@models/user.model";
import { UserService } from '@services/user.service';
import { Store } from '@ngrx/store';
import { AppStore } from '@models/store.model';
import * as AuthActions from '@store/auth/auth.action';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {

  public userTypes = Object.values(USER_TYPES);
  public title: string = 'Register';
  public wrongEmail: Boolean = false;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]],
      surname: [null, [Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]],
      type: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      repeatPassword: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  register() {

    const newUser: User = {
      name: this.name.value,
      surname: this.surname.value,
      type: this.type.value,
      email: this.email.value,
      password: this.password.value,
      loggedIn: true,
      education: [],
      languages: []
    }

    this.store$.dispatch(AuthActions.UserRegister({ user: newUser }));
    this.router.navigate(['']);



    // if ((this.registerForm.valid) /*&& (this.users.find(user => user.email === this.email.value) === undefined)*/) {

    //   if (this.userService.userLoggedIn !== undefined) {
    //     console.log(`User ${this.userService.userLoggedIn.email} must logout first`);
    //     return;
    //   }
    //   else {
    //     this.userService.getUserByEmail(this.email.value).subscribe(
    //       (user: User) => {
    //         if (user === undefined) {
    //           const newUser: User = {
    //             name: this.name.value,
    //             surname: this.surname.value,
    //             type: this.type.value,
    //             email: this.email.value,
    //             password: this.password.value,
    //             loggedIn: true,
    //             education: [],
    //             languages: []
    //           }
    //           this.userService.register(newUser).subscribe(
    //             () => {
    //               this.wrongEmail = false;
    //               console.log(`User ${newUser.email} registered successfully`);
    //               this.router.navigate(['']);
    //             }
    //           );
    //         }
    //         else {
    //           this.wrongEmail = true;
    //           setTimeout(() => this.wrongEmail = false, 10000);
    //           this.email.setErrors({ alreadyUsed: true });
    //           this.password.reset();
    //           this.repeatPassword.reset();
    //           console.log(`User ${user.email} is already registered`);
    //         }
    //       }
    //     )
    //   }


    // }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get surname() {
    return this.registerForm.get('surname');
  }

  get type() {
    return this.registerForm.get('type');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }

}
