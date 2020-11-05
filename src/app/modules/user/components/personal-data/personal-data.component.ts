import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NATIONALITIES } from '@constants/nationalities.constant';

import { User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { nifValidator } from '@validators/nif.validator';


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  public title: string = 'Profile';
  public aboutMePlaceholder = 'About me...';
  public nationalities: string[] = NATIONALITIES;
  public user: User;
  public profileSaved: Boolean = false;
  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router) { }

  ngOnInit(): void {

    this.user = this.us.userLoggedIn;
    this.createForm();
    this.profileForm.valueChanges.subscribe(
      () => this.us.profileDataSaved = false
    );

  }

  createForm() {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]],
      surname: [this.user.surname, [Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]],
      birthDate: [this.user.birthDate, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')],
      phone: [this.user.phone, Validators.pattern('^[0-9]+$')],
      nationality: [this.user.nationality],
      nif: [this.user.nif],
      aboutMe: [this.user.aboutMe ? this.user.aboutMe : this.aboutMePlaceholder]
    },
      {
        validators: nifValidator
      }
    );
    if (this.user.type === 'company') {
      this.profileForm.addControl('companyName', this.fb.control(this.user.companyName, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]));
      this.profileForm.addControl('companyDescription', this.fb.control(this.user.companyDescription));
      this.profileForm.addControl('cif', this.fb.control(this.user.cif));
    }

  }

  updateProfile() {
    if (this.profileForm.valid) {
      const user: User = {
        id: this.user.id,
        name: this.name.value,
        surname: this.surname.value,
        type: this.user.type,
        email: this.user.email,
        password: this.user.password,
        birthDate: this.birthDate.value,
        phone: this.phone.value,
        nationality: this.nationality.value,
        nif: this.nif.value,
        aboutMe: this.aboutMe.value !== this.aboutMePlaceholder ? this.aboutMe.value : null,
        loggedIn: this.user.loggedIn,
        education: this.user.education,
        languages: this.user.languages
      }
      if (this.user.type === 'company') {
        user.companyName = this.companyName.value;
        user.companyDescription = this.companyDescription.value;
        user.cif = this.cif.value;
      }
      this.us.updateUser(user).subscribe(
        () => {
          this.profileSaved = true;
          this.us.profileDataSaved = true;
          setTimeout(() => this.profileSaved = false, 10000);
          console.log(`User ${user.email} updated, new values:`, user);
        }
      );
    }
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
