import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NATIONALITIES } from '@constants/nationalities.constant';
import { AppStore } from '@models/store.model';

import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { UserService } from '@services/user.service';
import { nifValidator } from '@validators/nif.validator';
import { Observable } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import { take, tap } from 'rxjs/operators';
import { USER_TYPES } from '@constants/user-types.constant';
import * as UserActions from '@store/user/user.action';


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  public title: string = 'Profile';
  public aboutMePlaceholder = 'About me...';
  public nationalities = Object.values(NATIONALITIES);
  public userTypes = USER_TYPES;
  public user: User;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public profileSaved: Boolean = false;
  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {

    this.userLoggedIn$.pipe(
      take(1)
    ).subscribe(user => this.createForm(user));
    // this.user = this.us.userLoggedIn;
    // this.createForm();
    // this.profileForm.valueChanges.subscribe(
    //   () => this.us.profileDataSaved = false
    // );

  }

  createForm(u: User) {
    this.profileForm = this.fb.group({
      name: [u.name, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]],
      surname: [u.surname, [Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]],
      birthDate: [u.birthDate, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')],
      phone: [u.phone, Validators.pattern('^[0-9]+$')],
      nationality: [u.nationality ? u.nationality : null],
      nif: [u.nif ? u.nif : null],
      aboutMe: [u.aboutMe ? u.aboutMe : this.aboutMePlaceholder]
    },
      {
        validators: nifValidator
      }
    );
    if (u.type === 'company') {
      this.profileForm.addControl('companyName', this.fb.control(u.companyName, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]));
      this.profileForm.addControl('companyDescription', this.fb.control(u.companyDescription));
      this.profileForm.addControl('cif', this.fb.control(u.cif));
    }

    this.profileForm.valueChanges.subscribe(
      () => this.us.profileDataSaved = false
    );

  }

  updateProfile() {
    this.userLoggedIn$.pipe(
      take(1)
    ).subscribe(u => {
      if (this.profileForm.valid) {
        const user: User = {
          ...u,
          name: this.name.value,
          surname: this.surname.value,
          birthDate: this.birthDate.value,
          phone: this.phone.value,
          nationality: this.nationality.value,
          nif: this.nif.value,
          aboutMe: this.aboutMe.value !== this.aboutMePlaceholder ? this.aboutMe.value : null,
        }
        if (u.type === this.userTypes.company) {
          user.companyName = this.companyName.value;
          user.companyDescription = this.companyDescription.value;
          user.cif = this.cif.value;
        }


        this.store$.dispatch(UserActions.UserUpdatePersonalData({ user: user }));

        // this.us.updateUser(user).subscribe(
        //   () => {
        //     this.profileSaved = true;
        //     this.us.profileDataSaved = true;
        //     setTimeout(() => this.profileSaved = false, 10000);
        //     console.log(`User ${user.email} updated, new values:`, user);
        //   }
        // );
      }
    })
  }

  get name() {
    return this.profileForm.get('name');
  }

  get surname() {
    return this.profileForm.get('surname');
  }

  get birthDate() {
    return this.profileForm.get('birthDate');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get nationality() {
    return this.profileForm.get('nationality');
  }

  get nif() {
    return this.profileForm.get('nif');
  }

  get aboutMe() {
    return this.profileForm.get('aboutMe');
  }

  get companyName() {
    return this.profileForm.get('companyName');
  }

  get companyDescription() {
    return this.profileForm.get('companyDescription');
  }

  get cif() {
    return this.profileForm.get('cif');
  }

}
