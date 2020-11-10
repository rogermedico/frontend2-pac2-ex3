import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { USER_TYPES } from '@constants/user-types.constant';
import { User } from "@models/user.model";
import { Store } from '@ngrx/store';
import { AppStore } from '@models/store.model';
import * as UserActions from '@store/user/user.action';

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

  constructor(private store$: Store<AppStore>, private fb: FormBuilder, private router: Router) { }

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

    this.store$.dispatch(UserActions.UserRegister({ user: newUser }));
    this.router.navigate(['']);

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
